import React,{useContext} from "react";
import Wallet from '@project-serum/sol-wallet-adapter';
import {GlobalContext} from "../../../context/GlobalContext";

export default function ConnectWalletModalListItem(props) {
	const {globalData,setGlobalData}  = useContext(GlobalContext);
	
	let urlWallet = null;

	switch (props.name) {
		case "Sollet":
			
			urlWallet = new Wallet('https://www.sollet.io', process.env.REACT_APP_SOLANA_NETWORK)
			break;
		case "Phantom":
			
			urlWallet = new Wallet('https://phantom.app/', process.env.REACT_APP_SOLANA_NETWORK)
			break;	
		default:

			break;
	}
	
	
	
	return (
		<li className='modalListItem greenBtn'>
			<span onClick={() => setGlobalData({...globalData, selectedWallet:urlWallet})} className='modalListItemTitle'>{props.name}</span>
		</li>
	);
}
