import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../components/common/PageTitle";
import TicketPrice from "../components/Purchase/purchase-components/TicketPrice";
import HeaderInfo from "../components/Purchase/HeaderInfo";
import PurchaseCard from "../components/Purchase/PurchaseCard";
import "../css/purchase.css";
import { PurchaseContext } from "../context/PurchaseContext";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_CHARITIES } from "../graphql/queries";
import Loader from "../components/common/Loader"

function Purchase() {
  const { loading, data } = useQuery(FETCH_CHARITIES);
  const [purchaseData, setpurchaseData] = useState({
    ticketNumbers: [],
    Charity: null,
    upcomingPool: null,
  });
  // eslint-disable-line react-hooks/exhaustive-deps
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
