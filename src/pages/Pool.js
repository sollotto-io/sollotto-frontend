import React from 'react';
import PageTitle from '../components/common/PageSubtitle';
import useReduxState from '../components/hooks/useReduxState';
import PoolTable from "../components/Pool/poolTable.jsx";
// import ComingSoon from '../images/pictures/coming-soon.png

const Pool = () => {
const [globalData] = useReduxState((state) => state.globalData);
  console.log(globalData)
  
  return(
    <div className="pageWrapper">
      <div id="poolSection">
        {/* <img src={ComingSoon} alt="logo" className="comingSoon" /> */}
         <PageTitle subtitle="Pools" />
         <PoolTable rows={globalData.Pools}/>
      </div>
    </div>
  )};

export default Pool;
