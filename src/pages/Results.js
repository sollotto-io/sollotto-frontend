import React from "react";
import SortButtonsResult from "../components/Result/SortButtonsResult";
import PageTitle from "../components/common/PageTitle";
import SortHeader from "../components/common/sortHeader";
import "../css/result.css";
import ResultTable from "../components/Result/ResultTable";

export default function Results() {
  const results = [
    {
      DrawingName: "Pick 1",
      DrawingDate: "Wednesday May 26,2021",
      Winners: "10 11 12 14 15 11",
      PrizePool: 1000,
      TotalWinner: 1,
    },
  ];
  return (
    <div className="resultSection">
      <div id="resultHeader">
        <PageTitle title="Result" />
        <input
          id="search-pool"
          type="text"
          name="name"
          placeholder="Search result by name "
        />
      </div>
      <div className="wrapper">
        <SortHeader />
        <SortButtonsResult />
      </div>
      <ResultTable rows={results} />
    </div>
  );
}
