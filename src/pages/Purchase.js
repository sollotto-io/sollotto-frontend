import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../components/common/PageTitle";
import TicketPrice from "../components/Purchase/purchase-components/TicketPrice";
import HeaderInfo from "../components/Purchase/HeaderInfo";
import PurchaseCard from "../components/Purchase/PurchaseCard";
import "../css/purchase.css";
import { PurchaseContext } from "../context/PurchaseContext";
import { GlobalContext } from "../context/GlobalContext";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ACTIVE_CHARITIES } from "../graphql/queries";
import Loader from "../components/common/Loader"

function Purchase() {
  const { loading, data } = useQuery(FETCH_ACTIVE_CHARITIES);
  const {globalData, setGlobalData } = useContext(GlobalContext)
  const [purchaseData, setpurchaseData] = useState({
    ticketNumbers: [],
    Charity: null,
    upcomingPool: null,
  });

  useEffect(() => {
      if(loading===false){
      setGlobalData({
        ...globalData,
        charities: data.getActiveCharities
      })}
   
  }, [loading]) // eslint-disable-line react-hooks/exhaustive-deps
  if (loading) {
    return <Loader/>;
  } else {
    return (
      <PurchaseContext.Provider value={{ data, purchaseData, setpurchaseData }}>
        <div id="purchaseSection">
          <div className="pageHeader">
            <PageTitle title="Purchase" />
            <TicketPrice />
            <HeaderInfo />
          </div>
          <PurchaseCard />
        </div>
      </PurchaseContext.Provider>
    );
  }
}

export default Purchase;
