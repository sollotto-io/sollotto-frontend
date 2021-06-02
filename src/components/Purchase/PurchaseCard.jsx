import React, { useRef, useState } from "react";
import Card from "./purchase-components/Card";
import NumberSelector from "./NumberSelector";
import CharitySelector from "./CharitySelector";
import PurchaseButton from "./PurchaseButton.jsx";
import GreenGradientSvg from "../common/GreenGradientSvg";
import GreenGradientSvg2 from "../common/GreenGradientSvg2";
import PurpleGradientSvg from "../common/PurpleGradientSvg";
import TicketPrice from "./purchase-components/TicketPrice";
import {ToastContainer} from "react-toastify"

const PurchaseCard = () => {
	const [selectedCharity, setSelectedCharity] = useState(null);

	const ticketNumbers = useRef([])
	return (
		<div className='gradientBg gradientBorder'>
			<GreenGradientSvg />
			<GreenGradientSvg2 />
			<PurpleGradientSvg />
			<div className='purchaseCard'>
				<form action=''>
					<NumberSelector ticketNumbers ={ticketNumbers} />
					<CharitySelector selectedCharity={selectedCharity} setSelectedCharity={setSelectedCharity}  />
					<ToastContainer/>
					<div className='purchaseCardFooter'>
						<TicketPrice/>
						<PurchaseButton selectedCharity={selectedCharity} Numbers ={ticketNumbers} />
					</div>
				</form>
			</div>
		</div>
	);
};

export default Card(PurchaseCard);
