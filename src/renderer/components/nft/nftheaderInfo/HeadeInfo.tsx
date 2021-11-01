import "./index.scss";
import TranspInfo from "./transpInfo/TranspInfo";
import LotteryEndInfo from "./nftEndInfo/LotteryEndInfo";
import Counter from "../../common/counter/Counter";
import useReduxState from "../../../hooks/useTypedReduxState";
import _ from "lodash";

export default function NftHeaderInfo(): JSX.Element {
  const [
    {
      nfts: { nfts },
      selectedWallet,
    },
  ] = useReduxState((state) => state.globalData);
  let myTickets = [];
  let flag = false;
  const currentNft = nfts.filter((n) => n.status === "live")[0];

  if (selectedWallet !== null && selectedWallet !== undefined) {
    if (
      selectedWallet.publicKey !== null &&
      selectedWallet.publicKey !== undefined
    ) {
      flag = true;
      const wallet = selectedWallet.publicKey.toString();
      if (currentNft) {
        myTickets = currentNft.tickets.filter((t) => {
          return _.isEqual(wallet, t.walletId);
        });
      }
    }
  }
  if (currentNft === null) {
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
          <Counter time={currentNft.endDate} />
        </div>

        <p style={{ margin: 0, width: 210 }}>
          {" "}
          {flag
            ? `Total Tickets Purchased: # ${myTickets.length}`
            : "Please connect your wallet"}
        </p>
        <p style={{ textAlign: "right", margin: 0 }}>Prize Pool: {10} SOL</p>
      </>
    );
  }
}
