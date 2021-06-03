import React, { useContext } from "react";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import ConnectWalletModalListItem from "./ConnectWalletModalListItem";
import CloseIcon from "@material-ui/icons/Close";
import {GlobalContext} from "../../../context/GlobalContext"

export default function ConnectWalletModal(props) {
	const {globalData, setGlobalData} = useContext(GlobalContext)
	
	const setConnectId =() =>{
		setGlobalData({
			...globalData,
			connectedWalletId:props.walletId.current.value
		})
		localStorage.clear()
		localStorage.setItem("connectedWalletId", props.walletId.current.value)
		props.handleClose()
	}	
	return (
		<Modal
			open={props.open}
			onClose={props.handleClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
			className='connectModal'
		>
			<Fade in={props.open}>
				<div className='connectModalItem'>
					<div className='modalTitle'>
						Connect to a Wallet{" "}
						<CloseIcon
							style={{ cursor: "pointer" }}
							onClick={props.handleClose}
						/>
					</div>
					<ul className='modalList'>
						<input ref = {props.walletId} type="text" placeholder="enter your id" defaultValue="xyz"></input>
						<ConnectWalletModalListItem name="Sollet" />
						<ConnectWalletModalListItem name="Phantom" />
						<button onClick ={setConnectId}>getId</button>
					</ul>
				</div>
			</Fade>
		</Modal>
	);
}
