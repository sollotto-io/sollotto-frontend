import React, { useRef,useContext,useState } from "react";
import CharityImage from "./CharityImage";
import CharityName from "./CharityName";
import CharitySelectButton from "./CharitySelectButton";
import SolLottoLogo from "./purchase-components/SolLottoLogo";
import {CharityDataContext} from "./CharitySelectorGrid";
import { PurchaseContext } from "../../context/PurchaseContext";

const SingleCharitySelector = (props) => {
	const singleCharityRef = useRef(null);
	const [selectBtnRefArr,setSelectBtnRefArr] = useState([]);

	const data = useContext(CharityDataContext);
	var charityBtnHandler = (charityBtn) => {
		charitySelectHandler(charityBtn, singleCharityRef.current);
	};
	const {purchaseData,setPurchaseData} = useContext(PurchaseContext);


	//------------border and button styling while selected--------------------

	var charitySelectHandler = async (charityBtn, charityBlock) => {
		if (charityBtn === purchaseData.selectedCharity) {
			charityBtn.classList.remove("active");
			charityBtn.innerHTML = "SELECT";
			charityBlock.classList.add("psuedoGreyBg");
			charityBlock
				.querySelector(".charitySelectorIcon")
				.classList.remove("blockDisplay");
			charityBlock.classList.remove("gradientBg");
			setPurchaseData({...purchaseData,selectedCharity:null});
			selectBtnRefArr.forEach((charity, index) => {
				if (charity !== charityBtn) {
					charity.disabled = false;
					charity.classList.add("gradientBorder");
				}
			});
		} else if (charityBtn.disabled === true) {
			return;
		} else if (
			charityBtn !== purchaseData.selectedCharity &&
			charityBtn.disabled === false
		) {
			console.log(selectBtnRefArr);
			selectBtnRefArr.forEach(async (charity, index) => {
				console.log(charity);
				if (charity !== charityBtn) {
					console.log(charity);
					charity.disabled = true;
				} else if (charity === charityBtn) {
					charityBtn.classList.add("active");
					charityBtn.innerHTML = "SELECTED";
					await charityBlock.classList.remove("psuedoGreyBg");
					await charityBlock.classList.add("gradientBg");
					
					await charityBlock
						.querySelector(".charitySelectorIcon")
						.classList.add("blockDisplay");
						setPurchaseData({...purchaseData,selectedCharity:charityBtn});
				}
			});
		}
	};

	return (
		<div
			className='psuedoGreyBg psuedoBorder singleCharitySelectorWrapper'
			ref={singleCharityRef}
		>
			<div className='singleCharitySelector'>
				<SolLottoLogo charitySelectorIcon={true} />
				<CharityImage />
				<CharityName charityIndex={props.index} />
				<CharitySelectButton
					charityName = {data.getActiveCharities[props.index].charityName}
					charityId={data.getActiveCharities[props.index].id}
					charityBtnHandler={charityBtnHandler}
					selectBtnRefArr={selectBtnRefArr}
					setSelectBtnRefArr={setSelectBtnRefArr}
					singleCharityRef={singleCharityRef.current}
				/>
			</div>
		</div>
	);
};
export default SingleCharitySelector;
