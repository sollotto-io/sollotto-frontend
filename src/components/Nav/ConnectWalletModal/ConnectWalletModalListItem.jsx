import React,{useState,useMemo,useContext,useEffect} from "react";
import { Connection, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';
import Wallet from '@project-serum/sol-wallet-adapter';
import {GlobalContext} from "../../../context/GlobalContext";

export default function ConnectWalletModalListItem() {
	const network = 'http://localhost:8899';
	const {globalData,setGlobalData}  = useContext(GlobalContext);
	const [providerUrl, setProviderUrl] = useState('https://www.sollet.io');
	const connection = useMemo(() => new Connection(network), [network]);
	const urlWallet = useMemo(() => new Wallet(providerUrl, network), [
		providerUrl,
		network,
	]);

	
	async function sendTransaction(){

		try {
			let transaction = new Transaction().add(
			  SystemProgram.transfer({
				fromPubkey: globalData.selectedWallet.publicKey,
				toPubkey: globalData.selectedWallet.publicKey,
				lamports: 100,
			  })
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
			console.log('Transaction ' + signature + ' confirmed');
		  } catch (e) {
			console.warn(e);
			console.log('Error: ' + e.message);
		  }
		
	}
	

	return (
		<li className='modalListItem greenBtn'>
			<span onClick={() => setGlobalData({...globalData, selectedWallet:urlWallet})} className='modalListItemTitle'>Sollet</span>
		</li>
	);
}
