import React, { useContext } from "react";
import { PurchaseContext } from "../../context/PurchaseContext";
import { CharityIndexContext } from "./CharitySelectorGrid";
export default function CharityName(props) {
	const { purchaseData } = useContext(PurchaseContext);
	const charityIndexValue = useContext(CharityIndexContext);
	return (
		<div className='charityName'>
			{purchaseData.activeCharities[charityIndexValue].name}
		</div>
	);
}
