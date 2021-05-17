import React from "react";
import Card from "./purchase-components/Card";
import NumberSelector from "./NumberSelector";
import CharitySelector from "./CharitySelector";
import PurchaseButton from "./PurchaseButton.jsx";
import GreenGradientSvg from "./purchase-components/GreenGradientSvg";
import GreenGradientSvg2 from "./purchase-components/GreenGradientSvg2";
import PurpleGradientSvg from "./purchase-components/PurpleGradientSvg";
import TicketPrice from "./purchase-components/TicketPrice";


const PurchaseCard = () => {
	return (
		<div className='gradientBg gradientBorder'>
			<GreenGradientSvg />
			<GreenGradientSvg2 />
			<PurpleGradientSvg />
			<div className='purchaseCard'>
				<form action=''>
					<NumberSelector />
					<CharitySelector />
					<div className='purchaseCardFooter'>
						<TicketPrice/>
						<PurchaseButton />
					</div>
				</form>
			</div>
		</div>
	);
};

export default Card(PurchaseCard);
