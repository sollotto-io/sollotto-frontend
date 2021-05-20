import React, { useContext } from "react";
import { useParams } from "react-router";
import "../../css/pool.css";
import TimeRemaining from "./timeRemaining"
import PDetails from "../Pool/pDetails"
import {GlobalContext} from '../../context/GlobalContext';

const PoolDetailPage = () => {
  const {globalData} = useContext(GlobalContext)
  const { id } = useParams();
  const poolDetail = globalData.pools.find(p=> p.Pool === id)
  return (
    <div className="detailSection">
      <div className="topSection">
      <PDetails poolDetail={poolDetail} />
      <TimeRemaining time={poolDetail.TimeRemaining}/>

      </div>
    </div>
  );
};

export default PoolDetailPage;
