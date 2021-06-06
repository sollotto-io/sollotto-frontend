import React, { useContext } from "react";
import PageTitle from "../components/common/PageTitle";
import PoolTable from "../components/Pool/poolTable";
import "../css/pool.css";
import {GlobalContext} from "../context/GlobalContext"

const Pool = () => {
  const {globalData} = useContext(GlobalContext)
 
  return (
    <div id="poolSection">
      <div id="poolHeader">
        <PageTitle title="Pools" />
       
      </div>
      {globalData.pools ?  <PoolTable rows = {globalData.pools} /> : "" }
     
    </div>
  );
};

export default Pool;
