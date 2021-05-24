import React, { useContext,useState,useMemo } from "react";
import WalletConnect from "../Nav/WalletConnect"
import { PurchaseContext } from "../../context/PurchaseContext";
import { GlobalContext } from "../../context/GlobalContext";
import { Connection, SystemProgram,PublicKey, Transaction, clusterApiUrl,TransactionInstruction,Account,SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import BN from "bn.js";

export default function PurchaseButton({ selectedCharity, Numbers }) {
  const { purchaseData, setpurchaseData } = useContext(PurchaseContext);
  const { globalData } = useContext(GlobalContext);
  var tempArray = [];
  const network = 'http://localhost:8899';
	const connection = useMemo(() => new Connection(network), [network]);
  const getTicket = async () => {
    let lotteryInitProgramId = new PublicKey("3s4XSA1XVfqgq8YhgA4N1soza1mwKz36eh3PZqkaaLLA");
    let lotteryDataAccount = "";
    try {
      const solTransferTx = SystemProgram.transfer({
				fromPubkey: globalData.selectedWallet.publicKey,
				toPubkey: '74PY3822qBkN81JD3rDN5vqmUPFgPpC2LXh5ZxgR2RL3',
				lamports: 100,
			  });
        let charity_id = 1;
        let user_wallet_pk = globalData.selectedWallet.publicKey;
        let ticket_number_arr = [1,5,6,7,8,9];
        let dataArr = [charity_id,user_wallet_pk,ticket_number_arr];
        const ticketDataAccount = new Account();
        const createTicketDataAccountTx = SystemProgram.createAccount({
          space:42,
          lamports: 10,
          fromPubkey: globalData.selectedWallet.publicKey,
          newAccountPubkey: ticketDataAccount.publicKey,
          programId: lotteryInitProgramId
      });
        const purchaseTicketTx = new TransactionInstruction({
          programId: lotteryInitProgramId,
          keys: [
              { pubkey: lotteryDataAccount.publicKey, isSigner: false, isWritable: true },
              { pubkey: ticketDataAccount.publicKey, isSigner: false, isWritable: true },
              { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false},
          ],
          data: Buffer.from(Uint8Array.of(1, ...new BN(dataArr).toArray("le", 8)))
      })
			let transaction = new Transaction().add(
			  solTransferTx,createTicketDataAccountTx,purchaseTicketTx
			);
			console.log('Getting recent blockhash');
			transaction.recentBlockhash = (
			  await connection.getRecentBlockhash()
			).blockhash;
			console.log('Sending signature request to wallet');
			transaction.feePayer = globalData.selectedWallet.publicKey;
			let signed = await globalData.selectedWallet.signTransaction(transaction);
			console.log('Got signature, submitting transaction');
			let signature = await connection.sendRawTransaction(signed.serialize());
			console.log('Submitted transaction ' + signature + ', awaiting confirmation');
			await connection.confirmTransaction(signature, 'singleGossip');
      const encodedTicketState = (await connection.getAccountInfo(ticketDataAccount.publicKey, 'singleGossip')).data;
      console.log(`Ticket Data: ${encodedTicketState}`);
      const encodedLotteryState = (await connection.getAccountInfo(lotteryDataAccount.publicKey, 'singleGossip')).data;
      console.log(`Ticket Data: ${encodedLotteryState}`);
			console.log('Transaction ' + signature + ' confirmed');
		  } catch (e) {
			console.warn(e);
			console.log('Error: ' + e.message);
		  }

    // Numbers.current.map((el, index) => {
    //   return (tempArray[index] = el.value);
    // });
    // if(tempArray === [] || selectedCharity === null ){
    //   console.log("empty");
    // }else{
    //   setpurchaseData({
    //     ...purchaseData,
    //     ticketNumbers: tempArray,
    //     Charity: selectedCharity.value,
    //   });

    // }

   
  };
  const initLottery = async () => {
    
    let lotteryInitProgramId = new PublicKey("3s4XSA1XVfqgq8YhgA4N1soza1mwKz36eh3PZqkaaLLA");
    let holdingWalletId = globalData.selectedWallet.publicKey;
    
    try {
        let lottery_id = 1;
        let charity_ids = [1,2,3,4];
        let ticket_price = 0.01;
        let dataArr = [lottery_id,charity_ids,ticket_price];
        const lotteryDataAccount = new Account();
        const createLotteryDataAccountTx = SystemProgram.createAccount({
          space:42,
          lamports: 10,
          fromPubkey: globalData.selectedWallet.publicKey,
          newAccountPubkey: lotteryDataAccount.publicKey,
          programId: lotteryInitProgramId
      });
        const initLotteryTx = new TransactionInstruction({
          programId: lotteryInitProgramId,
          keys: [
              { pubkey: lotteryDataAccount.publicKey, isSigner: false, isWritable: true },
              { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false},
              { pubkey: globalData.selectedWallet.publicKey, isSigner: true, isWritable: false },
          ],
          data: Buffer.from(Uint8Array.of(1, ...new BN(dataArr).toArray("le", 8)))
      })
			let transaction = new Transaction().add(
			  createLotteryDataAccountTx,initLotteryTx
			);
			console.log('Getting recent blockhash');
			transaction.recentBlockhash = (
			  await connection.getRecentBlockhash()
			).blockhash;
			console.log('Sending signature request to wallet');
			transaction.feePayer = globalData.selectedWallet.publicKey;
      console.log(transaction);
      let signed = await globalData.selectedWallet.signTransaction(transaction);
      let signed2 = await transaction.sign({signers:[lotteryDataAccount]});
      let verify_signed = await transaction.verifySignatures();
      console.log(verify_signed);
			console.log('Got signature, submitting transaction:');
      console.log(signed);
      console.log(signed2);
			let signature = await connection.sendRawTransaction(signed.serialize());
			console.log('Submitted transaction ' + signature + ', awaiting confirmation');
			await connection.confirmTransaction(signature, 'singleGossip');
      const encodedLotteryState = (await connection.getAccountInfo(lotteryDataAccount.publicKey, 'singleGossip')).data;
      const encodedLotteryDataAccountPK = (await connection.getAccountInfo(lotteryDataAccount.publicKey, 'singleGossip')).owner.toBase58();
      console.log(`Lottery Data: ${encodedLotteryState}`);
      console.log(`Lottery Data Account PK: ${encodedLotteryDataAccountPK}`);
			console.log('Transaction ' + signature + ' confirmed');
		  } catch (e) {
			console.warn(e);
			console.log('Error: ' + e.message);
		  }

    // Numbers.current.map((el, index) => {
    //   return (tempArray[index] = el.value);
    // });
    // if(tempArray === [] || selectedCharity === null ){
    //   console.log("empty");
    // }else{
    //   setpurchaseData({
    //     ...purchaseData,
    //     ticketNumbers: tempArray,
    //     Charity: selectedCharity.value,
    //   });

    // }

   
  };
  const connectWalletBtn = () => {
    return (
      <WalletConnect />
    );
  };
  const getTicketBtn = () => {
    return (
      <>
        <button
          type="button"
          onClick={getTicket}
          className="greenBtn globalBtn"
        >
          Get a Ticket
        </button>
        <button type="button" onClick={initLottery} className="greenBtn globalBtn">Init Lottery</button>
        {/* <ConnectWalletModal open={open} handleClose={handleClose} /> */}
      </>
    );
  };
  return (
    <>
      {globalData.walletConnectedFlag === true
        ? getTicketBtn()
        : connectWalletBtn()}
    </>
  );
}
