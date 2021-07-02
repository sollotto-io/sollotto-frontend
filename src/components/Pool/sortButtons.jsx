import React, { useEffect, useState } from 'react';
import useReduxState from '../hooks/useReduxState';
var _ = require('lodash');

const SortButtons = () => {
  const [filter, setFilter] = useState(null);
  const [globalData, setGlobalData] = useReduxState((state) => state.globalData);

  useEffect(() => {
    let sortbyprize = _.sortBy(globalData.pools, filter);
    setGlobalData({
      type: 'SET_GLOBAL_DATA',
      arg: {
        pools: sortbyprize,
      },
    });
  }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id="sort-buttons">
      <button
        onClick={() => {
          setFilter('TimeRemaining');
        }}
      >
        TIME
      </button>
      <button
        onClick={() => {
          setFilter('PoolARP');
        }}
      >
        APR
      </button>
      <button
        onClick={() => {
          setFilter('PrizePool');
        }}
      >
        PRIZE POOL
      </button>
    </div>
  );
};

export default SortButtons;
