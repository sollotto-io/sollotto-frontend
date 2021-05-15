import React, { useState } from "react";
import PageTitle from "../components/Purchase/purchase-components/PageTitle";
import TicketPrice from "../components/Purchase/purchase-components/TicketPrice";
import HeaderInfo from "../components/Purchase/HeaderInfo";
import PurchaseCard from "../components/Purchase/PurchaseCard";
import "../css/purchase.css";
import { PurchaseContext } from "../context/PurchaseContext";



export default function Purchase() {
	const [purchaseData, setPurchaseData] = useState({
		cuurentTicketprice: 0.01,
		activeCharities: [
			{ id: 1, name: "All Hands and Hearts" },
			{ id: 2, name: "International Medical Corps" },
			{ id: 3, name: "Opportunity International" },
			{ id: 4, name: "UNICEF" },
		],
		ticketNumbers: [0,0,0,0,0,0],
		selectedCharity: null,
	});
	return (
		<PurchaseContext.Provider value={{ purchaseData, setPurchaseData }}>
			<div id='purchaseSection'>
				<div className='pageHeader'>
					<PageTitle title='Purchase' />
					<TicketPrice />
					<HeaderInfo />
				</div>
				<PurchaseCard />
			</div>
		</PurchaseContext.Provider>
	);
}
