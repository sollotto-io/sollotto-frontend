import React, { useState } from "react";
import SingleCharitySelector from "./SingleCharitySelector";

export default function CharitySelectorGrid() {
	const [selectedCharity, setSelectedCharity] = useState(null);
	const [selectBtnRefArr, setSelectBtnRefArr] = useState([]);

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
	return (
		<div className='charitySelectorGrid'>
			<SingleCharitySelector
				name='All Hands and Hearts'
				charityId={1}
				charitySelectHandler={charitySelectHandler}
				selectBtnRefArr={selectBtnRefArr}
			/>
			<SingleCharitySelector
				name='International Medical Corps'
				charityId={2}
				charitySelectHandler={charitySelectHandler}
				selectBtnRefArr={selectBtnRefArr}
			/>
			<SingleCharitySelector
				name='Opportunity International'
				charityId={3}
				charitySelectHandler={charitySelectHandler}
				selectBtnRefArr={selectBtnRefArr}
			/>
			<SingleCharitySelector
				name='UNICEF'
				charityId={4}
				charitySelectHandler={charitySelectHandler}
				selectBtnRefArr={selectBtnRefArr}
			/>
		</div>
	);
}
