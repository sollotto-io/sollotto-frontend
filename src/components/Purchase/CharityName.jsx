import React, { useContext } from "react";
import { PurchaseContext } from "../../context/PurchaseContext";
import { CharityIndexContext } from "./CharitySelectorGrid";
export default function CharityName(props) {
	const {data} = useContext(PurchaseContext);
	const charityIndexValue = useContext(CharityIndexContext);
	return (
		<div className='charityName'>
			{data.getActiveCharities[charityIndexValue].charityName}
		</div>
	);
}
