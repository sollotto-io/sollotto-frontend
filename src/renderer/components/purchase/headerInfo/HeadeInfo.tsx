import "./index.scss";
import TranspInfo from "./transpInfo/TranspInfo";
import LotteryEndInfo from "./lotteryEndInfo/LotteryEndInfo";
import Counter from "../../common/counter/Counter";
import Loader from "../../common/loader/Loader";
import useReduxState from "../../../hooks/useReduxState";
import _ from "lodash";
import { IlotteryTicket } from "../../../api/types/lotteryData";

export default function HeaderInfo(): JSX.Element {
  const [lotteryState] = useReduxState((state) => state.lotteryData);

  const { lotteryData, loading } = lotteryState;
  const [globalData] = useReduxState((state) => state.globalData);
  let myTickets = [];
  let flag = false;

  if (
    globalData.selectedWallet !== null &&
    globalData.selectedWallet !== undefined
  ) {
    if (
      globalData.selectedWallet.publicKey !== null &&
      globalData.selectedWallet.publicKey !== undefined
    ) {
      flag = true;
      const wallet = Buffer.from(
        globalData.selectedWallet.publicKey.toBytes()
      ).toJSON().data;
      myTickets = lotteryData.Tickets.filter((t: IlotteryTicket) => {
        return _.isEqual(wallet, t.walletID);
      });
    }
  }
  if (loading === true) {
    return <Loader />;
  } else if (lotteryData === null) {
    return (
      <>
        <div className="headerIcons">
          <TranspInfo />
        </div>
        <div className="lotteryCountdown">
          <p>please wait till another draw starts</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="headerIcons">
          <TranspInfo />
          <LotteryEndInfo />
        </div>
        <div className="lotteryCountdown">
          <Counter time={lotteryData.EndDate} />
        </div>

        <p style={{ margin: 0, width: 210 }}>
          {" "}
          {flag
            ? `Total Tickets Purchased: # ${myTickets.length}`
            : "Please connect your wallet"}
        </p>
        <p style={{ textAlign: "right", margin: 0 }}>
          Prize Pool: {lotteryData.TotalPoolValue.toFixed(2)} SOL
        </p>
      </>
    );
  }
}
