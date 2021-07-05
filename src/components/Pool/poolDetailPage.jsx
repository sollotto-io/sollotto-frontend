import React from 'react';
import { useParams } from 'react-router';
import '../../css/pool.css';
// import TimeRemaining from './timeRemaining';
import PDetails from './pDetails';
import WinningSection from './winningSection';
import PoolExtraInfo from './poolExtraInfo';
import Loader from '../common/Loader';
import useReduxState from '../hooks/useReduxState';
import TimeRemaining from '../Pool/timeRemaining';

const PoolDetailPage = () => {
  const [globalData] = useReduxState((state) => state.globalData);
  const { id } = useParams();
  const poolDetail = globalData.Pools.find((p) => p.Pool === id);
  return (
    <div className="detailSection">
      <div className="topSection">
        {poolDetail ? (
          <>
            {' '}
            <PDetails poolDetail={poolDetail} />
            <TimeRemaining time={poolDetail.TimeRemaining} />{' '}
          </>
        ) : (
          <Loader />
        )}
      </div>
      <div className="bottomSection">
        {poolDetail ? (
          <>
            <WinningSection poolDetail={poolDetail} />
            <PoolExtraInfo />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default PoolDetailPage;
