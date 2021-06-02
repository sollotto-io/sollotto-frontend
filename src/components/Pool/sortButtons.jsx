import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
var _ = require("lodash");

const SortButtons = () => {
  const [filter, setFilter] = useState(null);
  const { globalData, setGlobalData } = useContext(GlobalContext);

  useEffect(() => {
    let sortbyprize = _.sortBy(globalData.pools, filter);
    setGlobalData({
      ...globalData,
      pools: sortbyprize,
    });
  }, [filter]);

  return (
    <div id="sort-buttons">
      <button
        onClick={() => {
          setFilter("TimeRemaining");
        }}
      >
        TIME
      </button>
      <button
        onClick={() => {
          setFilter("PoolARP");
        }}
      >
        APR
      </button>
      <button
        onClick={() => {
          setFilter("PrizePool");
        }}
      >
        PRIZE POOL
      </button>
    </div>
  );
};

export default SortButtons;
