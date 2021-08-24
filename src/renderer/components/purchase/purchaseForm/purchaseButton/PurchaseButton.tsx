import "./index.scss";

import WalletConnect from "../../../common/walletConnect/WallectConnect";
import useReduxState from "../../../../hooks/useReduxState";
import PrimaryButton from "../../../common/primaryButton/PrimaryButton";

export default function PurchaseButton({
  handleSubmit,
}: {
  handleSubmit: () => void;
}): JSX.Element {
  const [globalData] = useReduxState((state) => state.globalData);

  /*   const { selectedCharity } = useSelector(
    (state: AppState) => state.purchaseData
  ); */

  const connectWalletBtn = () => <WalletConnect />;

  const getTicketBtn = () => (
    <>
      <PrimaryButton onClick={handleSubmit}>Get a Ticket</PrimaryButton>
    </>
  );
  return (
    <>
      {globalData.walletConnectedFlag === true
        ? getTicketBtn()
        : connectWalletBtn()}
    </>
  );
}
