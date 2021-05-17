import React, { useState, useContext, createContext } from "react";
import SingleCharitySelector from "./SingleCharitySelector";
import { PurchaseContext } from "../../context/PurchaseContext";
export const CharityIndexContext = createContext(null);

export default function CharitySelectorGrid() {
	const [selectedCharity, setSelectedCharity] = useState(null);
	const [selectBtnRefArr, setSelectBtnRefArr] = useState([]);
	const { purchaseData } = useContext(PurchaseContext);

	var charitySelectHandler = (charityBtn, charityBlock) => {
		if (charityBtn === selectedCharity) {
			charityBtn.classList.toggle("active");
			charityBtn.innerHTML = "SELECT";
			charityBlock.classList.toggle("psuedoGreyBg");
			charityBlock
				.querySelector(".charitySelectorIcon")
				.classList.toggle("blockDisplay");
			charityBlock.classList.toggle("gradientBg");
			setSelectedCharity(null);
			selectBtnRefArr.forEach((charity, index) => {
				if (charity !== charityBtn) {
					charity.disabled = false;
					charity.classList.toggle("gradientBorder");
				}
			});
		} else if (charityBtn.disabled === true) {
			return;
		} else if (
			charityBtn !== selectedCharity &&
			charityBtn.disabled === false
		) {
			selectBtnRefArr.forEach((charity, index) => {
				if (charity !== charityBtn) {
					charity.disabled = true;
				} else if (charity === charityBtn) {
					charityBtn.classList.toggle("active");
					charityBtn.innerHTML = "SELECTED";
					charityBlock.classList.toggle("psuedoGreyBg");
					charityBlock.classList.toggle("gradientBg");
					setSelectedCharity(charityBtn);
					charityBlock
						.querySelector(".charitySelectorIcon")
						.classList.toggle("blockDisplay");
				}
			});
		}
	};
	const displayCharities = () => {
		const charities = [];
		for (let index = 0; index < purchaseData.activeCharities.length; index++) {
			charities.push(
				<CharityIndexContext.Provider key={index} value={index}>
					<SingleCharitySelector
						charityId={purchaseData.activeCharities[index].id}
						charitySelectHandler={charitySelectHandler}
						selectBtnRefArr={selectBtnRefArr}
					/>
				</CharityIndexContext.Provider>
			);
		}
		return charities;
	};
	return <div className='charitySelectorGrid'>{displayCharities()}</div>;
}
