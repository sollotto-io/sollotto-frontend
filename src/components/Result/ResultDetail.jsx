import React from "react";
import { useParams } from "react-router";
import RDetail from "./RDetails";
import GreenGradientSvg from "../common/GreenGradientSvg";

const ResultDetail = () => {
  const { id } = useParams();
  return (
    <div className="detailSection">
      <div className="topSection">
        <RDetail id={id} />
        <div className="wrap gradientBg ">
          <div className="win">
            <h4>No Winning Ticket</h4>
            <p>Better Luck Next Time</p>
          </div>
        </div>
      </div>
      <div className="bottomSectionResult gradientBg2">
        <div id="ticket-details">
          <h4>Solana {id}</h4>
          <h4>Wednesday 26th 2021</h4>
          <br></br>
          <p>Your Number</p>
          <p>03  10  11  05  55  01</p>
        </div>
      </div>
    </div>
  );
};

export default ResultDetail;
