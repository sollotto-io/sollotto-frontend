import {
    SystemProgram,
    PublicKey,
    Transaction,
    TransactionInstruction,
    Account,
    SYSVAR_RENT_PUBKEY,
    sendAndConfirmRawTransaction,
  } from "@solana/web3.js";
  import store from "../../../redux/stores/store";
  import CryptoJS from "crypto-js";
  import { Buffer } from "buffer";
  
  /*eslint-disable  @typescript-eslint/no-non-null-assertion*/
  /*eslint-disable  @typescript-eslint/no-explicit-any */
  export const ticketPurchase = async (purchaseDataArr: {
    charityId: string;
    userWalletPK: number[];
    ticketNumArr: number[];
    lotteryDataAccount: string;
  }): Promise<any> => {
    const state = store.getState();
    const globalData = state.globalData;
  
    const charityPK = globalData.charities.charities.find(
      (c) => c.id === purchaseDataArr.charityId
    );
    const lotteryDataAccountBytes = CryptoJS.AES.decrypt(
      purchaseDataArr.lotteryDataAccount,
      process.env.REACT_APP_SECRET_KEY!
    );
    const HoldingWalletDecryptedText = JSON.parse(
      lotteryDataAccountBytes.toString(CryptoJS.enc.Utf8)
    );
    const lotteryDataAccount = new Account(HoldingWalletDecryptedText);
  
    const lotteryInitProgramId = new PublicKey(
      process.env.REACT_APP_SOLANA_INIT_LOTTERY_PROGRAM!
    );
  
    const holdingWalletPK = new PublicKey(globalData.holdingWalletId);
  
    if (
      globalData.selectedWallet !== null &&
      globalData.selectedWallet.publicKey !== null
    ) {
      try {
        const data = {
          charity: new PublicKey(charityPK?.publicKey as string),
          user_wallet_pk: globalData.selectedWallet.publicKey,
          ticket_number_arr: purchaseDataArr.ticketNumArr,
        };
        console.log(data)
        const dataArr = Buffer.from(JSON.stringify(data))
        
        const ticketDataAccount = new Account();
        const createTicketDataAccountTx = SystemProgram.createAccount({
          space: 71,
          lamports: await globalData.connection.getMinimumBalanceForRentExemption(
            71,
            "singleGossip"
          ),
          fromPubkey: globalData.selectedWallet.publicKey,
          newAccountPubkey: ticketDataAccount.publicKey,
          programId: lotteryInitProgramId,
        
        });
  
        const purchaseTicketTx = new TransactionInstruction({
          programId: lotteryInitProgramId,
          keys: [
            {
              pubkey: lotteryDataAccount.publicKey,
              isSigner: true,
              isWritable: true,
            },
            {
              pubkey: ticketDataAccount.publicKey,
              isSigner: false,
              isWritable: true,
            },
            {
              pubkey: globalData.selectedWallet.publicKey,
              isSigner: true,
              isWritable: true,
            },
            {
              pubkey: holdingWalletPK,
              isSigner: false,
              isWritable: true,
            },
            { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
            { pubkey: lotteryInitProgramId, isSigner: false, isWritable: false },
          ],
          data: dataArr,
        });
        console.log(typeof dataArr)
        const transaction = new Transaction().add(
          createTicketDataAccountTx,
          purchaseTicketTx
        );
        console.log(purchaseTicketTx)
        const signers = [ticketDataAccount,lotteryDataAccount];
        transaction.feePayer = globalData.selectedWallet.publicKey;
        transaction.setSigners(
          globalData.selectedWallet.publicKey,
          ...signers.map((s) => s.publicKey),
        );
  
        transaction.recentBlockhash = (
          await globalData.connection.getRecentBlockhash()
        ).blockhash;
      
        
        transaction.partialSign(...signers);
        
        const signedTx = await globalData.selectedWallet.signTransaction(
          transaction
        );
  
        console.log(signedTx.signatures[0].publicKey.toBase58());
        console.log(signedTx.signatures[1].publicKey.toBase58());
        console.log(signedTx.signatures[2].publicKey.toBase58());
        console.log(signedTx.signatures[0].signature);
        console.log(signedTx.signatures[1].signature);
        console.log(signedTx.signatures[2].signature);
        console.log(signedTx.feePayer?.toBase58());
        // console.log( signedTx.serialize() )
        // const transactionB64 = Buffer.from(signedTx.serialize()).toString('base64')
        // console.log(transactionB64)
        // const signature = await globalData.connection.sendEncodedTransaction(
        //   transactionB64,{preflightCommitment:"singleGossip"}
        // );
  
        // await globalData.connection.confirmTransaction(signature, "singleGossip");
  
        // signedTx.sign(...[lotteryDataAccount])
        // console.log(transaction.signatures[0].publicKey.toBase58())
        // console.log(ticketDataAccount.publicKey.toBase58())
  
        const signature = await sendAndConfirmRawTransaction(
          globalData.connection,
          signedTx.serialize(),
        )
        return {
          DataWallet: ticketDataAccount.publicKey.toBytes(),
          success: true,
          signature: signature,
        };
      } catch (e) {
        console.log(e);
        return { success: false };
      }
    }
  };
  
  
  
  