import React from "react";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
export default function WalletConnect() {
	return (
		<button className='walletConnect greenBtn globalBtn'>
			<AccountBalanceWalletOutlinedIcon fontSize='small' />
			<span>Connect</span>
		</button>
	);
}
