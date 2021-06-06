import React, { useContext, useEffect } from "react";
import "../css/charity.css";
import PageTitle from "../components/common/PageTitle";
import SortHeader from "../components/common/sortHeader";
import SortButtonsCharity from "../components/Charity/sortButtonsCharity.jsx";
import CharityTable from "../components/Charity/charityTable";
import {FETCH_ALL_CHARITIES} from '../graphql/queries'
import { useQuery } from "@apollo/client";
import {GlobalContext} from "../context/GlobalContext"



export default function Charities() {
  const {globalData, setGlobalData} = useContext(GlobalContext)


  
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
      {globalData.charities ? <CharityTable rows={globalData.charities} /> : ""}
    </div>
  );
}
