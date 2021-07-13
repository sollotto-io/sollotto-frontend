import useReduxState from "../../hooks/useReduxState";
import "./index.scss";
import { AppState } from "../../redux/stores/store";
import useDidUpdateEffect from "../../hooks/useDidUpdateEffect";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import reduxAction from "../../redux/reduxAction";
import GreenGradientSvg from "../common/greenGradientSvg/GreenGradientSvg";
import GreenGradientSvg2 from "../common/greenGradientSvg2/GreenGradientSvg2";
import PurpleGradientSvg from "../common/purpleGradientSvg/PurpleGradientSvg";
import RandomButton from "../common/primaryButton/PrimaryButton";
import { RandomTicketGenerator } from "../../../utils/helpers";
import { IlotteryTicket } from "../../api/types/lotteryData";
import PurchaseForm from "./purchaseForm/PurchaseForm";

export default function PurchaseCard(): JSX.Element {
  const { ticketNumberArr, valid } = useSelector(
    (state: AppState) => state.purchaseData
  );
  const [{ loading, lotteryData }] = useReduxState(
    (state: AppState) => state.lotteryData
  );

  const [globalData] = useReduxState((state: AppState) => state.globalData);

  const verifyRepeatedTicket = () => {
    if (globalData.selectedWallet) {
      const currentTicket = [...ticketNumberArr];
      const currentWalletId = Buffer.from(
        globalData.selectedWallet.publicKey.toBytes()
      ).toJSON().data;

      const validate = lotteryData.Tickets.some(
        (t: IlotteryTicket) =>
          t.ticketArray.filter((ti: number) => currentTicket.includes(ti))
            .length === 6 &&
          t.walletID.filter((wi: number) => currentWalletId.includes(wi))
            .length === 32
      );

      return validate;
    } else {
      return false;
    }
  };

  useDidUpdateEffect(() => {
    if (
      !ticketNumberArr.some((n) => n === undefined) &&
      !loading &&
      verifyRepeatedTicket()
    ) {
      toast.warn("Warning: You alredy bought that ticket", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [ticketNumberArr]);
  return (
    <div className="card">
      <div className="gradientBg gradientBorder">
        <GreenGradientSvg />
        <GreenGradientSvg2 />
        <PurpleGradientSvg />
        <div className="purchaseCard">
          <p
            className="ticketNumInst"
            style={{
              marginTop: 0,
              maxWidth: 400,
              color: valid ? "#FFF" : "#ff604f",
            }}
          >
            Please pick your numbers. Choose a number between 1-49 for the first
            5 selections, and a number between 1-26 for the 6th selection
          </p>
          <RandomButton
            style={{ marginBottom: "20px" }}
            onClick={() => {
              reduxAction({
                type: "SET_PURCHASE_DATA",
                arg: {
                  ticketNumberArr: RandomTicketGenerator(),
                },
              });
            }}
          >
            Generate Random Ticket
          </RandomButton>
          <PurchaseForm />
        </div>
      </div>
    </div>
  );
}
