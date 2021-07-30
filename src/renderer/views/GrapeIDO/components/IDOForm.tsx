import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import useReduxState from "../../../hooks/useReduxState";
import { AppState } from "../../../redux/stores/store";
import { sortTicketNumber } from "../../../../utils/helpers";
import NumberSelectorIDO from "../numberSelector/NumberSelector";
import reduxAction from "../../../redux/reduxAction";
import IDOButton from "./IDOButton";
import { sendWinnerNumbers } from "../utils/sendWinnerNumbers";
import { RandomTicketGenerator } from "../utils/randomWinnerNumbers";

export interface IusersProps {
  users: number;
  setSelection: (isSelectionOver: boolean) => void;
  csvInput:any
}
export default function IDOForm({
  users,
  setSelection,
  csvInput
}: IusersProps): JSX.Element {
  const [globalData] = useReduxState((state: AppState) => state.globalData);
  const [loading, setLoading] = useState(false);

  const [winners, SetWinners] = useState(0);

  async function handleSubmitIDO() {
    if (users === 0 || NaN || null || winners ===0) {
      
      toast.warn("Please enter the number of users", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }else if(csvInput.length ===0){
      toast.warn("Please select CSV file", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const tempticketArr = RandomTicketGenerator(users, winners);

      const ticketNumbers = sortTicketNumber(tempticketArr);
      if (globalData.selectedWallet === null) {
        toast.error("Please Connect your Wallet! ", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return false;
      }
      const ticketData = {
        charityId: "12345",
        userWalletPK: globalData.selectedWallet.publicKey.toBytes(),
        ticketNumArr: [ticketNumbers[0],ticketNumbers[1],ticketNumbers[2],ticketNumbers[3],ticketNumbers[4],ticketNumbers[5]],
      };

      setLoading(true);
      if (globalData.walletBalance === 0) {
        toast.error(
          "Ticket purchase unsuccessful. You dont have enough SOL in your wallet to purchase a ticket",
          {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        setLoading(false);
      } else {
        const result = await sendWinnerNumbers(ticketData);
        if (result.success === true) {
          try {
            setLoading(false);
            reduxAction({ type: "RESET_PURCHASE_DATA", arg: null });

            toast.success(
              <div>
                Winning Number successfully selected
                <br />
                Winning Number:&nbsp;
                {[...tempticketArr]
                  .splice(0, tempticketArr.length - 2)
                  .join(",")}
                ,{tempticketArr[4]}
                <br />
                <a
                  style={{ textDecoration: "underline" }}
                  href={`https://solscan.io/tx/${result.signature}?cluster=devnet`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Your Transacton
                </a>
              </div>,
              {
                position: "bottom-left",
                autoClose: 6000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
            reduxAction({
              type: "SET_PURCHASE_DATA",
              arg: {
                ticketNumberArr: ticketNumbers,
              },
            });
            setSelection(true);
            globalData.selectedWallet.disconnect();

            // reduxAction({ type: "RESET_PURCHASE_DATA", arg: null });
          } catch (e) {
            console.log(e);
          }
        }
        if (result.success === false) {
          toast.error("Ticket Purchase Unsuccessful", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoading(false);
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmitIDO}>
      <div style={{ display: "grid", gridTemplateColumns: "auto" }}>
        <p
          className="ticketNumInst"
          style={{
            marginTop: 5,
            maxWidth: 400,
            marginBottom: 15,
            marginRight: 5,
          }}
        >
          Total Number of Winners:
          <span>
            <input
              type="number"
              onChange={(e) => SetWinners(parseInt(e.target.value) || 0)}
              id="users"
            />
          </span>
        </p>
      </div>
      <NumberSelectorIDO winners={winners} />

      <ToastContainer className="toast-container" />
      <div className="purchaseCardFooter">
        {loading ? (
          <span style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress size={30} />
          </span>
        ) : (
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <IDOButton handleSubmit={handleSubmitIDO} />
          </span>
        )}
      </div>
    </form>
  );
}
