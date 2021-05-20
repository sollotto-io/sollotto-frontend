import React,{useState,useEffect,useMemo} from "react";
import { Connection, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';
import Wallet from '@project-serum/sol-wallet-adapter';

export default function ConnectWalletModalListItem() {
	const network = clusterApiUrl('http://localhost:8899');
	const [selectedWallet, setSelectedWallet] = useState(undefined);
	const [connectFlag, setConnected] = useState(false);
	const [providerUrl, setProviderUrl] = useState('https://www.sollet.io');
	const connection = useMemo(() => new Connection(network), [network]);
	const urlWallet = useMemo(() => new Wallet(providerUrl, network), [
		providerUrl,
		network,
	]);
	async function transferSol(){

		try {
			let transaction = new Transaction().add(
			  SystemProgram.transfer({
				fromPubkey: selectedWallet.publicKey,
				toPubkey: selectedWallet.publicKey,
				lamports: 100,
			  })
			);
			addLog('Getting recent blockhash');
			transaction.recentBlockhash = (
			  await connection.getRecentBlockhash()
			).blockhash;
			addLog('Sending signature request to wallet');
			transaction.feePayer = selectedWallet.publicKey;
			let signed = await selectedWallet.signTransaction(transaction);
			addLog('Got signature, submitting transaction');
			let signature = await connection.sendRawTransaction(signed.serialize());
			addLog('Submitted transaction ' + signature + ', awaiting confirmation');
			await connection.confirmTransaction(signature, 'singleGossip');
			addLog('Transaction ' + signature + ' confirmed');
		  } catch (e) {
			console.warn(e);
			addLog('Error: ' + e.message);
		  }
		
	}
	useEffect(() => {
		if (selectedWallet) {
		  selectedWallet.on('connect', () => {
			setConnected(true);
			addLog('Connected to wallet ' + selectedWallet.publicKey.toBase58());
		  });
		  selectedWallet.on('disconnect', () => {
			setConnected(false);
			addLog('Disconnected from wallet');
		  });
		  selectedWallet.connect();
		  return () => {
			selectedWallet.disconnect();
		  };
		}
	  }, [selectedWallet]);

	return (
		<li className='modalListItem greenBtn'>
			<span onClick={() => transferSol()} className='modalListItemTitle'>Ledger</span>
		</li>
	);
}
