import React, { useState } from "react";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import ConnectWalletModal from "../ConnectWalletModal/ConnectWalletModal";

export default function WalletConnect() {
	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	const handleClickOpen = () => {
		setOpen(true);
	};
	return (
		<>
			<button
				className='walletConnect greenBtn globalBtn'
				onClick={handleClickOpen}
			>
				<AccountBalanceWalletOutlinedIcon fontSize='small' />
				<span>Connect</span>
			</button>
			<ConnectWalletModal open={open} handleClose={handleClose} />
		</>
	);
}
