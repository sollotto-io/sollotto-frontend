import React from "react";
import PageTitle from "../components/PageTitle";
import TicketPrice from "../components/TicketPrice";
import HeaderInfo from "../components/Purchase/HeaderInfo";
import PurchaseCard from "../components/Purchase/PurchaseCard";
import "../css/purchase.css";
export default function Purchase() {
	return (
		<div id='purchaseSection'>
			<div className='pageHeader'>
				<PageTitle value='Purchase' />
				<TicketPrice value={0.01} />
				<HeaderInfo />
			</div>
			<PurchaseCard />
		</div>
	);
}
