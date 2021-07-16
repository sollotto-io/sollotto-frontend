import PrimaryButton from "../../../components/common/primaryButton/PrimaryButton";
import WalletConnect from "../../../components/common/walletConnect/WallectConnect";
import useReduxState from "../../../hooks/useReduxState";


export default function IDOButton({
  handleSubmit,
}: {
  handleSubmit: () => void;
}): JSX.Element {
  const [globalData] = useReduxState((state) => state.globalData);



  const connectWalletBtn = () => <WalletConnect />;

  const getTicketBtn = () => (
    <>
      <PrimaryButton onClick={handleSubmit}>
      Get Winning Numbers
      </PrimaryButton>
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
