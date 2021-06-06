import React from "react";
import PageTitle from "../components/common/PageTitle";
import "../css/result.css";
import ResultTable from "../components/Result/ResultTable";


export default function Results() {
  return (
    <div className="resultSection">
      <div id="resultHeader">
        <PageTitle title="Result" />
      
      </div>

      <ResultTable />
    </div>
  );
}
