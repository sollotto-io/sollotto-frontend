import React, { useContext, useEffect } from "react";
import "../css/charity.css";
import PageTitle from "../components/common/PageTitle";
import SortHeader from "../components/common/sortHeader";
import SortButtons from "../components/Charity/sortButtons";
import CharityTable from "../components/Charity/charityTable";
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
          placeholder="Search pools by name or ticker"
        />
      </div>
      <div className="wrapper">
        <SortHeader />
        <SortButtons />
      </div>
      {globalData.pools ? <CharityTable rows={globalData.charities} /> : ""}
    </div>
  );
}
