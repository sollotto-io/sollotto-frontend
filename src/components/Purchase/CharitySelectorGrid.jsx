import React, { useState, useContext, createContext,useEffect } from "react";
import SingleCharitySelector from "./SingleCharitySelector";
import { PurchaseContext } from "../../context/PurchaseContext";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ACTIVE_CHARITIES } from "../../graphql/queries";
import Loader from "../../components/common/Loader";
export const CharityDataContext = createContext(null);

export default function CharitySelectorGrid() {
	const { loading, data } = useQuery(FETCH_ACTIVE_CHARITIES);
	const {purchaseData,setPurchaseData} = useContext(PurchaseContext);
	const [selectedCharityBtn, setSelectedCharityBtn] = useState(null);
	const [selectedCharityBlock, setSelectedCharityBlock] = useState(null);
	useEffect(() => {
		if(loading===false){
		setPurchaseData({
		  ...purchaseData,
		  lotteryCharities: data.getActiveCharities
		})}
	 
	}, [loading])// eslint-disable-line react-hooks/exhaustive-deps
	

	


	//------------border and button styling while selected--------------------

	var charitySelectHandler = async (charityBtn, charityBlock,charityIndex) => {
		if (charityBtn === selectedCharityBtn) {
			charityBtn.classList.remove("active");
			charityBtn.innerHTML = "SELECT";
			charityBlock.classList.add("psuedoGreyBg");
			charityBlock
				.querySelector(".charitySelectorIcon")
				.classList.remove("blockDisplay");
			charityBlock.classList.remove("gradientBg");
			setSelectedCharityBtn(null);
			setPurchaseData({...purchaseData,selectedCharity:null});
			document.querySelectorAll('.charitySelectBtn').forEach(async (charity) => {
				if (!charity.classList.contains('active')) {
					charity.disabled = false;
				}
			});
			
		}  else if (
			charityBtn !== selectedCharityBtn 
		) {
			if(selectedCharityBtn !==null ){
				selectedCharityBtn.classList.remove("active");
				selectedCharityBtn.innerHTML = "SELECT";
				selectedCharityBlock.classList.add("psuedoGreyBg");
				selectedCharityBlock
				.querySelector(".charitySelectorIcon")
				.classList.remove("blockDisplay");
				selectedCharityBlock.classList.remove("gradientBg");

			charityBtn.classList.add("active");
			charityBtn.innerHTML = "SELECTED";
			charityBlock.classList.remove("psuedoGreyBg");
			charityBlock.classList.add("gradientBg");
			charityBlock
				.querySelector(".charitySelectorIcon")
				.classList.add("blockDisplay");
			setSelectedCharityBtn(charityBtn);
			setSelectedCharityBlock(charityBlock);
			setPurchaseData({...purchaseData,selectedCharity:charityIndex});
			}
			charityBtn.classList.add("active");
			charityBtn.innerHTML = "SELECTED";
			charityBlock.classList.remove("psuedoGreyBg");
			charityBlock.classList.add("gradientBg");
			charityBlock
				.querySelector(".charitySelectorIcon")
				.classList.add("blockDisplay");
			setSelectedCharityBtn(charityBtn);
			setSelectedCharityBlock(charityBlock);
			setPurchaseData({...purchaseData,selectedCharity:charityIndex});
	
			// document.querySelectorAll('.charitySelectBtn').forEach(async (charity,index) => {
			// 	if (!charity.classList.contains('active')) {
			// 		charity.disabled = true;
			// 	}
			// });

		}
	};	

	if (loading) {
		return <Loader/>;
	  } else {
		return <CharityDataContext.Provider value={data}><div className='charitySelectorGrid'>{
			data.getActiveCharities.map((charity,index) => {
			return <SingleCharitySelector charityId={charity.ID} index={index} key={index} charitySelectHandler={charitySelectHandler}
					/>;
		})
		}</div></CharityDataContext.Provider>;
	}

}
	

