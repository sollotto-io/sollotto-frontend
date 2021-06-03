import React from "react";
import PageTitle from "../components/common/PageTitle";
import TicketPrice from "../components/Purchase/purchase-components/TicketPrice";
import HeaderInfo from "../components/Purchase/HeaderInfo";
import PurchaseCard from "../components/Purchase/PurchaseCard";
import "../css/purchase.css";

function Purchase() {
	return (
		<div id='purchaseSection'>
			<div className='pageHeader'>
				<PageTitle title='Purchase' />
				<TicketPrice />
				<HeaderInfo />
			</div>
			<PurchaseCard />
		</div>
	);
}

export default Purchase;
