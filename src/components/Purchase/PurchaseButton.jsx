import React, { useContext,useState,useMemo } from "react";
import WalletConnect from "../Nav/WalletConnect"
import { PurchaseContext } from "../../context/PurchaseContext";
import { GlobalContext } from "../../context/GlobalContext";
import { Connection, SystemProgram,PublicKey, Transaction, clusterApiUrl,TransactionInstruction,Account,SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import BN from "bn.js";
import * as borsh from "borsh";

/**
 * Borsh schema definition for greeting accounts
 */
 function intToBool(i) {
  if (i === 0) {
    return false
  } else {
    return true
  }
}

function boolToInt(t) {
  if (t) {
    return 1
  } else {
    return 0
  }
}

const boolMapper = {
  encode: boolToInt,
  decode: intToBool
}
class IncomingLotteryDataAccount {
  constructor(lottery_id,charity_id_1,charity_id_2,charity_id_3,charity_id_4,ticket_price) {
    this.lottery_id = lottery_id;
    this.charity_id_1= charity_id_1;
    this.charity_id_2= charity_id_2;
    this.charity_id_3= charity_id_3;
    this.charity_id_4= charity_id_4;
    this.ticket_price= ticket_price;
  }
}
const IncomingLotteryDataSchema = new Map([
  [IncomingLotteryDataAccount, {kind: 'struct', fields: [['lottery_id', "u32"],['charity_id_1', "u32"],['charity_id_2', "u32"],['charity_id_3', "u32"],['charity_id_4', "u32"],['ticket_price', "u32"]]}],
]);
class LotteryDataAccount {
  constructor(is_lottery_initialised,lottery_id,charity_1_id,charity_2_id,charity_3_id,charity_4_id,charity_1_vc,charity_2_vc,charity_3_vc,charity_4_vc,winner_user_wallet_pk,total_pool_value,total_registrations,ticket_price) {
    this.is_lottery_initialised = is_lottery_initialised;
    this.lottery_id = lottery_id;
    this.charity_1_id= charity_1_id;
    this.charity_2_id= charity_2_id;
    this.charity_3_id= charity_3_id;
    this.charity_4_id= charity_4_id;
    this.charity_1_vc= charity_1_vc;
    this.charity_2_vc= charity_2_vc;
    this.charity_3_vc= charity_3_vc;
    this.charity_4_vc= charity_4_vc;    
    this.winner_user_wallet_pk= winner_user_wallet_pk;
    this.total_pool_value= total_pool_value;
    this.total_registrations= total_registrations;
    this.ticket_price= ticket_price;
  }
}
const LotteryDataSchema = new Map([
  [LotteryDataAccount, {kind: 'struct', fields: [['is_lottery_initialised', "u8",boolMapper],['lottery_id', "u32"],['charity_1_id',"u32"],['charity_2_id',"u32"],['charity_3_id',"u32"],['charity_4_id',"u32"],['charity_1_vc',"u32"],['charity_2_vc',"u32"],['charity_3_vc',"u32"],['charity_4_vc',"u32"],['winner_user_wallet_pk', [32]],['total_pool_value', "u32"],['total_registrations', "u32"],['ticket_price', "u32"]]}],
]);
/**
 * The expected size of each greeting account.
 */
// const LOTTERY_DATA_SIZE = borsh.serialize(
//   LotteryDataSchema,
//   new LotteryDataAccount(),
// ).length;


export default function PurchaseButton({ selectedCharity, Numbers }) {
  const { purchaseData, setpurchaseData } = useContext(PurchaseContext);
  const { globalData } = useContext(GlobalContext);
  var tempArray = [];
  const network = 'http://localhost:8899';
	const connection = useMemo(() => new Connection(network), [network]);
  const getTicket = async () => {
    let lotteryInitProgramId = new PublicKey(process.env.SOLANA_INIT_LOTTERY_PROGRAM);
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
    console.log(process.env.REACT_APP_SOLANA_INIT_LOTTERY_PROGRAM);
    let lotteryInitProgramId = new PublicKey(process.env.REACT_APP_SOLANA_INIT_LOTTERY_PROGRAM);
    let holdingWalletId = globalData.selectedWallet.publicKey;
    
    try {
        let lottery_id = 1;
        let charity_ids = [1,2,3,4];
        let ticket_price = 0.01;
        let dataArr = [lottery_id,charity_ids,ticket_price];
        
        const lotteryDataAccount = new Account();
        const createLotteryDataAccountTx = SystemProgram.createAccount({
          space:81,
          lamports: 10000000000,
          fromPubkey: globalData.selectedWallet.publicKey,
          newAccountPubkey: lotteryDataAccount.publicKey,
          programId: lotteryInitProgramId
      });
      
        const value = new IncomingLotteryDataAccount(1,1,2,3,4,1);
        const buffer = borsh.serialize(IncomingLotteryDataSchema, value);
        const dataArr2 = new Uint8Array([0, ...buffer]);
        console.log(dataArr2);
        console.log(dataArr2.length);
        console.log(buffer);
        console.log(buffer.length);
        const initLotteryTx = new TransactionInstruction({
          programId: lotteryInitProgramId,
          keys: [
              { pubkey: lotteryDataAccount.publicKey, isSigner: false, isWritable: true },
              { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false},
              { pubkey: globalData.selectedWallet.publicKey, isSigner: true, isWritable: false },
          ],
          data: dataArr2
      })
			let transaction = new Transaction().add(
			  createLotteryDataAccountTx,initLotteryTx
			);
      let signers = [lotteryDataAccount];
      transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash
      // transaction.feePayer = globalData.selectedWallet.publicKey;
      transaction.setSigners(globalData.selectedWallet.publicKey, ...signers.map((s) => s.publicKey))
      if (signers.length > 0) {
        transaction.partialSign(...signers)
      }
      console.log(transaction)
      let signedTx = await globalData.selectedWallet.signTransaction(transaction)
      console.log(await transaction.verifySignatures());
      console.log(signedTx);
			// console.log('Getting recent blockhash');
			// transaction.recentBlockhash = (
			//   await connection.getRecentBlockhash()
			// ).blockhash;
      // console.log(transaction);
			// console.log('Sending signature request to wallet');
			// // transaction.feePayer = globalData.selectedWallet.publicKey;
      // console.log(transaction);
      // // let signed = await globalData.selectedWallet.signTransaction(transaction);
      // console.log([globalData.selectedWallet,lotteryDataAccount]);
      // let signed2 = await transaction.sign(lotteryDataAccount);
      // let verify_signed = await transaction.verifySignatures();
      // console.log(verify_signed);
			// console.log('Got signature, submitting transaction:');
      // // console.log(signed);
      // console.log(signed2);
			let signature = await connection.sendRawTransaction(signedTx.serialize());
			console.log('Submitted transaction ' + signature + ', awaiting confirmation');
			await connection.confirmTransaction(signature, 'singleGossip');
      const encodedLotteryState = (await connection.getAccountInfo(lotteryDataAccount.publicKey, 'singleGossip')).data;
      const decodedLotteryState = borsh.deserialize(LotteryDataSchema, LotteryDataAccount, encodedLotteryState);
      const encodedLotteryDataAccountPK = (await connection.getAccountInfo(lotteryDataAccount.publicKey, 'singleGossip')).owner.toBase58();

      console.log(`Lottery Data: ${JSON.stringify(decodedLotteryState)}`);
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
