import React,{useContext} from "react";
import { GlobalContext } from "../../../context/GlobalContext";

export default function TicketPrice() {
	const { globalData } = useContext(GlobalContext);
	return (
		<div className='ticketPrice'>
			Ticket Price: {globalData.currentLottery.TicketPrice} SOL
		</div>
	);
}
