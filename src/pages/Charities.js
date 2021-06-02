import React, { useContext, useEffect } from "react";
import "../css/charity.css";
import PageTitle from "../components/common/PageTitle";
import SortHeader from "../components/common/sortHeader";
import SortButtonsCharity from "../components/charity/sortButtonsCharity.jsx";
import CharityTable from "../components/charity/charityTable";
import {FETCH_ALL_CHARITIES} from '../graphql/queries'
import { useQuery } from "@apollo/client";
import {GlobalContext} from "../context/GlobalContext"



export default function Charities() {
  const {loading,data} = useQuery(FETCH_ALL_CHARITIES)
  const {globalData, setGlobalData} = useContext(GlobalContext)


  useEffect(() => {
   if(loading===false){
    setGlobalData({
      ...globalData,
      charities: data.getAllCharities
    })
   }
   
  }, [loading]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="charitySection">
      <div id="poolHeader">
        <PageTitle title="Charities" />
        <input
          id="search-pool"
          type="text"
          name="name"
          placeholder="Search charity by name "
        />
      </div>
      <div className="wrapper">
        <SortHeader />
        <SortButtonsCharity />
      </div>
      {globalData.pools ? <CharityTable rows={globalData.charities} /> : ""}
    </div>
  );
}
