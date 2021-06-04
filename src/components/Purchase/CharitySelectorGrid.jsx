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

	useEffect(() => {
		if(loading===false){
		setPurchaseData({
		  ...purchaseData,
		  lotteryCharities: data.getActiveCharities
		})}
	 
	}, [loading])
	

	


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
			
		} else if (charityBtn.disabled === true) {
			return;
		} else if (
			charityBtn !== selectedCharityBtn &&
			charityBtn.disabled === false
		) {
			await charityBtn.classList.add("active");
			charityBtn.innerHTML = "SELECTED";
			await charityBlock.classList.remove("psuedoGreyBg");
			await charityBlock.classList.add("gradientBg");
			await charityBlock
				.querySelector(".charitySelectorIcon")
				.classList.add("blockDisplay");
			setSelectedCharityBtn(charityBtn);
			await setPurchaseData({...purchaseData,selectedCharity:charityIndex});
	
			document.querySelectorAll('.charitySelectBtn').forEach(async (charity,index) => {
				if (!charity.classList.contains('active')) {
					charity.disabled = true;
				}
			});

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
	

