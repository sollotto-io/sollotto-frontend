import React, { useEffect, useState } from "react";
import PageTitle from "../components/common/PageTitle";
import TicketPrice from "../components/Purchase/purchase-components/TicketPrice";
import HeaderInfo from "../components/Purchase/HeaderInfo";
import PurchaseCard from "../components/Purchase/PurchaseCard";
import "../css/purchase.css";
import { PurchaseContext } from "../context/PurchaseContext";
import { useQuery } from "@apollo/react-hooks";

import { FETCH_CHARITIES } from "../graphql/queries";
function Purchase() {
  const { loading, data } = useQuery(FETCH_CHARITIES);
  const [purchaseData, setpurchaseData] = useState({
	ticketNumbers: [],
	Charity: null,
  })
  useEffect(() => {
	console.log(purchaseData)
}, [purchaseData])


  if (loading) {
    return "hello";
  } else {
    return (
      <PurchaseContext.Provider value={{data,purchaseData, setpurchaseData}}>
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
