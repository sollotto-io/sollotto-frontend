import "./index.scss";

import { IconButton } from "@material-ui/core";
import SollotoGradient from "../../../common/sollottoGradient/SollottoGradient";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router";
import { ICharity } from "../../../../api/types/globalData";

const CharityDetailContent = ({
  charityDetail,
}: {
  charityDetail: ICharity;
}): JSX.Element => {
  const history = useHistory<{ fromPurchase: boolean }>();
  const sendToCharity = () => {
    if (history.location.state.fromPurchase === true) {
      history.push("/purchase");
    } else {
      history.push("/charities");
    }
  };

  return (
    <section id="poolC">
      <div id="charityHeader">
        <div id="back-button">
          <IconButton onClick={sendToCharity} style={{ color: "white" }}>
            <ArrowBackIcon />
          </IconButton>
          <h4> {charityDetail.charityName}</h4>
        </div>
        <div>
          <SollotoGradient addedBy={charityDetail.addedBy} />
        </div>
      </div>
      <div id="other-details">
        <section>
          <p>Current Votes</p>
          <p>
            {charityDetail.currentVotes === null
              ? "-"
              : charityDetail.currentVotes}
          </p>
        </section>
        <section>
          <p>Lifetime Votes</p>
          <p>
            {charityDetail.lifeTimeVotes === null
              ? "-"
              : charityDetail.lifeTimeVotes}
          </p>
        </section>
        <section>
          <p>Lifetime Wins</p>
          <p>
            {charityDetail.lifeTimeWins === null
              ? "-"
              : charityDetail.lifeTimeWins}
          </p>
        </section>
      </div>
    </section>
  );
};

export default CharityDetailContent;
