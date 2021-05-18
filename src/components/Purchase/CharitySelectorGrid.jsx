import React, { useState, useContext, createContext } from "react";
import SingleCharitySelector from "./SingleCharitySelector";
import { PurchaseContext } from "../../context/PurchaseContext";

export const CharityIndexContext = createContext(null);

export default function CharitySelectorGrid({selectedCharity,setSelectedCharity}) {
	const [selectBtnRefArr] = useState([]);
	const {data}  = useContext(PurchaseContext);

//------------border and button styling while selected--------------------

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

//---------display charities------------------
	const displayCharities = () => {
		const charities = [];
		for (let index = 0; index < data.getAllCharities.length; index++) {
			charities.push(
				<CharityIndexContext.Provider key={index} value={index}>
					<SingleCharitySelector
						charityId={data.getAllCharities[index].id}
						charityName = {data.getAllCharities[index].charityName}
						charitySelectHandler={charitySelectHandler}
						selectBtnRefArr={selectBtnRefArr}
					/>
				</CharityIndexContext.Provider>
			);
		}
		return charities;
	};

	
	return data?  <div className='charitySelectorGrid'>{displayCharities()}</div> : <h1>helo</h1>;

}
	

