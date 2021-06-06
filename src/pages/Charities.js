import React, { useContext } from "react";
import "../css/charity.css";
import PageTitle from "../components/common/PageTitle";
import CharityTable from "../components/Charity/charityTable";
import {GlobalContext} from "../context/GlobalContext"
import "../css/pool.css";



export default function Charities() {
  const {globalData} = useContext(GlobalContext)


  
  return (
    <div className="charitySection">
      <div id="poolHeader">
        <PageTitle title="Charities" />
      
      </div>
      {globalData.charities ? <CharityTable rows={globalData.charities} /> : ""}
    </div>
  );
}
