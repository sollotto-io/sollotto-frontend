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
import {PurchaseContext} from "../../context/PurchaseContext";

const PurchaseCard = () => {

	const ticketNumbers = useRef([])
	const [purchaseData, setPurchaseData] = useState({
		ticketNumberArr: [],
		selectedCharity: null,
	});
	return (
		<div className='gradientBg gradientBorder'>
			<GreenGradientSvg />
			<GreenGradientSvg2 />
			<PurpleGradientSvg />
			<div className='purchaseCard'>
			<PurchaseContext.Provider value={{ purchaseData, setPurchaseData }}>
				<p style ={{marginTop:0, maxWidth:400}}>Pick your numbers. Choose a number 1-69 for the first 5 numbers and a number 1-26 for the sixth number</p>
				<form>
					<NumberSelector ticketNumbers ={ticketNumbers} />
					<CharitySelector />
					<ToastContainer/>
					<div className='purchaseCardFooter'>
						<TicketPrice/>
						<PurchaseButton  />
					</div>
				</form>
			</PurchaseContext.Provider>
			</div>
		</div>
	);
};

export default Card(PurchaseCard);
