import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function TicketPrice(props) {
	const { globalData, setGlobalData } = useContext(GlobalContext);
	return (
		<div className='ticketPrice'>
			Ticket Price: {globalData.currentTicketprice} SOL
		</div>
	);
}
