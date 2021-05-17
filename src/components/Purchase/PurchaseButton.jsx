import React, { useContext, useState } from "react";
import ConnectWalletModal from "../Nav/ConnectWalletModal/ConnectWalletModal";
import { GlobalContext } from "../../context/GlobalContext";

export default function PurchaseButton() {
	const { globalData } = useContext(GlobalContext);
	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(false);
	
	};
	const handleClickOpen = () => {
		setOpen(true);
	};
	const connectWalletBtn = () => {
		return (
			<>
				<button
					type='button'
					onClick={handleClickOpen}
					className='greenBtn globalBtn'
				>
					Connect Wallet
				</button>
				<ConnectWalletModal open={open} handleClose={handleClose} />
			</>
		);
	};
	const getTicketBtn = () => {
		return (
			<>
				<button
					type='button'
					onClick={handleClickOpen}
					className='greenBtn globalBtn'
				>
					Get a Ticket
				</button>
				<ConnectWalletModal open={open} handleClose={handleClose} />
			</>
		);
	};
	return (
		<>{globalData.connectedWalletId ? getTicketBtn() : connectWalletBtn()}</>
	);
}
