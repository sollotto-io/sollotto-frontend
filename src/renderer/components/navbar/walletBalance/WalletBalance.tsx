import "./index.scss";

import useReduxState from "../../../hooks/useReduxState";

export default function WalletBalance(): JSX.Element {
  const [globalData] = useReduxState((state) => state.globalData);

  if (globalData.walletConnectedFlag && globalData.walletBalance !== null) {
    return (
      <p className="wallet-balance">{`${(
        globalData.walletBalance / 1000000000
      ).toFixed(2)} SOL`}</p>
    );
  } else {
    return <></>;
  }
}
