import "./index.scss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router";
import checkIfWinner from "../../utils/checkIfWinner";
import moment from "moment";
import { sortTicketNumber } from "../../../../../utils/helpers";
import useReduxState from "../../../../hooks/useReduxState";
import { IDrawingId } from "../../../../api/types/lotteryData";

const ResultDetailContent = ({
  lotteryData,
}: {
  lotteryData: IDrawingId;
}): JSX.Element => {
  const [globalData] = useReduxState((state) => state.globalData);

  const history = useHistory();
  const sendToResults = () => {
    history.push(`/results/`);
  };
  const EndDate = moment(lotteryData.EndDate);
  const Today = moment();

  const dif = EndDate.diff(Today);

  const WinningNumbers = sortTicketNumber(lotteryData.WinningNumbers);
  function userResult() {
    let result = null;

    if (lotteryData.WinnerWallet.length === 0) {
      if (lotteryData.isActive === true) {
        result = <p>TBD</p>;
      } else if (lotteryData.isActive === false) {
        if (dif > 0) {
          result = <p>TBD</p>;
        } else {
          result = <p>Lost</p>;
        }
      }
    } else {
      if (
        checkIfWinner(
          lotteryData,
          globalData.selectedWallet.publicKey.toBytes()
        )
      ) {
        result = <p>Won</p>;
      } else {
        result = <p>Lost</p>;
      }
    }
    return result;
  }
  if (lotteryData) {
    return (
      <section id="poolC">
        <div id="charityHeader">
          <div id="back-button">
            <IconButton onClick={sendToResults} style={{ color: "white" }}>
              <ArrowBackIcon />
            </IconButton>
            <h4>Pick 6</h4>
          </div>
          <div>
            <h4>{moment(lotteryData.EndDate).format("LL")}</h4>
          </div>
        </div>
        <div id="other-details">
          <section>
            <p>Prize Pool</p>
            <p>
              {lotteryData.TotalPoolValue === null
                ? "TBD"
                : lotteryData.TotalPoolValue.toFixed(2)}
            </p>
          </section>
          <section>
            <p>Total Winners</p>
            <p>{lotteryData.WinnerWallet.length}</p>
          </section>
          <section>
            <p>Winning Numbers</p>
            <p>
              {WinningNumbers.length === 0 ? "TBD" : WinningNumbers[0]}
              &nbsp; {WinningNumbers[1]}&nbsp; {WinningNumbers[2]}
              &nbsp; {WinningNumbers[3]}&nbsp; {WinningNumbers[4]}
              &nbsp; {WinningNumbers[5]}{" "}
            </p>
          </section>
          <section>
            <p>Your Result</p>
            {userResult()}
          </section>
        </div>
        <section id="charity-list">
          {lotteryData.WinningCharity.length === 0 &&
          new Date(lotteryData.EndDate) > new Date(Date.now()) ? null : (
            <WinningCharityResult lotteryData={lotteryData} />
          )}
        </section>
      </section>
    );
  }
  return <></>;
};

export default ResultDetailContent;

const WinningCharityResult = ({ lotteryData }: { lotteryData: IDrawingId }) => {
  const arr: IDrawingId["CharityVoteCount"] = [];
  let totalVotes = 0;
  lotteryData.CharityVoteCount.forEach((c) => {
    totalVotes = totalVotes + c.votes;
    if (lotteryData.WinningCharity.find((t) => t.id === c.charityId.id)) {
      arr.push(c);
    }
  });

  return (
    <div>
      {lotteryData.WinningCharity.length === 1 ? (
        <span
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "200px 200px 200px 200px",
            alignItems: "center",
          }}
        >
          <p>Winning Charity</p>
          <p style={{ textAlign: "center" }}>Votes</p>
          <p style={{ textAlign: "center" }}>%votes</p>
        </span>
      ) : (
        <span
          style={{
            display: "grid",
            gridTemplateColumns: "200px 200px 200px 200px",
          }}
        >
          <p>Winning Charities</p>
          <p style={{ textAlign: "center" }}>Votes</p>
          <p style={{ textAlign: "center" }}>%votes</p>
          <p style={{ textAlign: "center" }}>SOL recieved</p>
        </span>
      )}
      <div id="winner-charity-list">
        {arr.length === 0 ? (
          <span
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "200px 200px 200px 200px",
              alignItems: "center",
            }}
          >
            <p>TBD</p>
            <p style={{ textAlign: "center" }}>TBD</p>
            <p style={{ textAlign: "center" }}>TBD</p>
          </span>
        ) : (
          arr.map((c, i) => {
            return (
              <span
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "200px 200px 200px 200px",
                  alignItems: "center",
                }}
                key={i}
              >
                {" "}
                <p>{c.charityId.charityName}</p>
                <p style={{ textAlign: "center" }}>
                  {c.votes}
                </p>
                <p style={{ textAlign: "center" }}>
                  {((c.votes / totalVotes) * 100).toFixed(2)}
                </p>
                <p style={{ textAlign: "center" }}>
                  {((lotteryData.TotalPoolValue * 0.3) / arr.length).toFixed(2)}
                </p>
              </span>
            );
          })
        )}
      </div>
    </div>
  );
};
