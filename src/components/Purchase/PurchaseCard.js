import React from "react";
import Card from "../Card";
import NumberSelector from "./NumberSelector";
import CharitySelector from "./CharitySelector";
import PurchaseButton from "./PurchaseButton.js";
import GreenGradientSvg from "../GreenGradientSvg";
import GreenGradientSvg2 from "../GreenGradientSvg2";
import PurpleGradientSvg from "../PurpleGradientSvg";
import TicketPrice from "../TicketPrice";
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
						<TicketPrice />
						<PurchaseButton />
					</div>
				</form>
			</div>
		</div>
	);
};

export default Card(PurchaseCard);
