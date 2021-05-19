import React, { useContext } from "react";
import PageTitle from "../components/common/PageTitle";
import SortHeader from "../components/Pool/sortHeader";
import SortButtons from "../components/Pool/sortButtons";
import PoolTable from "../components/Pool/poolTable";
import "../css/pool.css";
import {GlobalContext} from "../context/GlobalContext"

const Pool = () => {
  const {globalData} = useContext(GlobalContext)
 
  return (
    <div id="poolSection">
      <div id="poolHeader">
        <PageTitle title="Pools" />
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

      <PoolTable rows = {globalData.pools} />
    </div>
  );
};

export default Pool;
