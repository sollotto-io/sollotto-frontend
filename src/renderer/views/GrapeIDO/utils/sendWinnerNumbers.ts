import { TicketDataSchema } from '../../../components/purchase/utils/TicketDataBorsh';
import {
    SystemProgram,
    PublicKey,
    Transaction,
    TransactionInstruction,
    Account,
    SYSVAR_RENT_PUBKEY,
    LAMPORTS_PER_SOL,
  } from "@solana/web3.js";
  import * as borsh from "borsh";
import { TicketDataAccount } from "../../../components/purchase/utils/TicketDataBorsh";
import store from "../../../redux/stores/store";
  
  /*eslint-disable  @typescript-eslint/no-non-null-assertion*/
  /*eslint-disable  @typescript-eslint/no-explicit-any */
  export const sendWinnerNumbers = async (purchaseDataArr: {
    charityId: string;
    userWalletPK: number[];
    ticketNumArr: number[];
  }): Promise<any> => {
    const state = store.getState();
  
    const globalData = state.globalData;
  
    const lotteryInitProgramId = new PublicKey(
      process.env.REACT_APP_SOLANA_INIT_LOTTERY_PROGRAM!
    );
  
    const holdingWalletPK = new PublicKey(globalData.holdingWalletId);
    // const holdingWalletPK = new PublicKey("gpsyx7W4VQeA9G5xxQ113abnMGx9MAqGSR7hoPCx5bF");
  
    if (
      globalData.selectedWallet !== null &&
      globalData.selectedWallet.publicKey !== null
    ) {
      try {
        const solTransferTx = SystemProgram.transfer({
          fromPubkey: globalData.selectedWallet.publicKey,
          toPubkey: holdingWalletPK,
          lamports: 0.1 * LAMPORTS_PER_SOL,
        });
        const value = new TicketDataAccount(
          purchaseDataArr.charityId,
          purchaseDataArr.userWalletPK,
          purchaseDataArr.ticketNumArr
        );
        const buffer = borsh.serialize(TicketDataSchema, value);
        const dataArr2 = new Uint8Array([1, ...buffer]) as Buffer;
  
        const ticketDataAccount = new Account();
        const createTicketDataAccountTx = SystemProgram.createAccount({
          space: 42,
          lamports: await globalData.connection.getMinimumBalanceForRentExemption(
            42,
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
              pubkey: ticketDataAccount.publicKey,
              isSigner: false,
              isWritable: true,
            },
            { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
            {
              pubkey: globalData.selectedWallet.publicKey,
              isSigner: true,
              isWritable: false,
            },
          ],
          data: dataArr2,
        });
        const transaction = new Transaction().add(
          solTransferTx,
          createTicketDataAccountTx,
          purchaseTicketTx
        );
  
        const signers = [ticketDataAccount];
  
        transaction.recentBlockhash = (
          await globalData.connection.getRecentBlockhash()
        ).blockhash;
        transaction.setSigners(
          globalData.selectedWallet.publicKey,
          ...signers.map((s) => s.publicKey)
        );
        if (signers.length > 0) {
          transaction.partialSign(...signers);
        }
  
        const signedTx = await globalData.selectedWallet.signTransaction(
          transaction
        );
  
        const signature = await globalData.connection.sendRawTransaction(
          signedTx.serialize()
        );
        await globalData.connection.confirmTransaction(signature, "singleGossip");
  
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
  