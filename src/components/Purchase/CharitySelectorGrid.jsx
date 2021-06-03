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
	
	useEffect(() => {
		if(loading===false){
		setPurchaseData({
		  ...purchaseData,
		  lotteryCharities: data.getActiveCharities
		})}
	 
	}, [loading])
	

//---------display charities------------------
	

	if (loading) {
		return <Loader/>;
	  } else {
		return <CharityDataContext.Provider value={data}><div className='charitySelectorGrid'>{
			data.getActiveCharities.map((charity,index) => {
			return <SingleCharitySelector index={index} key={index}
					/>;
		})
		}</div></CharityDataContext.Provider>;
	}

}
	

