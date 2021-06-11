import moment from "moment";
import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router";

const RDetail = ({ globalData, data }) => {
    const history = useHistory();
    const sendToResults = () =>{
        history.push(`/results/`);
    }
  function userResult() {
    let result = null;
    if (data.isActive === true) {
      result = <p>TBD</p>;
    } else if (data.isActive === false) {
      if (data.WinnerWallet !== 0) {
        result = <p>TBD</p>;
      } else {
        data.WinnerWallet.forEach((val) => {
          if (val !== globalData.selectedWallet.publicKey.toBytes()) {
            result = <p>Lost</p>;
          } else if (val === globalData.selectedWallet.publicKey.toBytes()) {
            result = <p>Won</p>;
          }
        });
      }
    }
    return result;
  }
  if (data) {
    return (
      <section id="poolC">
        <div id="charityHeader">
          <div id="back-button">
              <IconButton onClick ={sendToResults} style={{color:"white"}}>
            <ArrowBackIcon />
            </IconButton>
            <h4>Pick 6</h4>
          </div>
          <div>
            <h4>{moment(data.EndDate).format("LL")}</h4>
          </div>
        </div>
        <div id="other-details">
          <section>
            <p>Prize Pool</p>
            <p>{data.TotalPoolValue.toFixed(2)}</p>
          </section>
          <section>
            <p>Total Winners</p>
            <p>{data.WinnerWallet.length}</p>
          </section>
          <section>
            <p>Winning Numbers</p>
            <p>
              {data.WinningNumbers.length === 0
                ? "TBD"
                : data.WinningNumbers[0]}
              &nbsp; {data.WinningNumbers[1]}&nbsp; {data.WinningNumbers[2]}
              &nbsp; {data.WinningNumbers[3]}&nbsp; {data.WinningNumbers[4]}
              &nbsp; {data.WinningNumbers[5]}{" "}
            </p>
          </section>
          <section>
            <p>Your Result</p>
            {userResult()}
          </section>
          <section>

            <p>{data.WinningCharity.length===1 ? "Winning Charity": "Winning Charities"}</p>
            {data.WinningCharity.length === 0
              ? "TBD"
              : data.WinningCharity.map((c, i) => {
                  var cha = globalData.charities.find((t) => t.ID === c);
                  return <p key={i}>{cha.charityName}</p>;
                })}
          </section>
        </div>
      </section>
    );
  }
};

export default RDetail;
