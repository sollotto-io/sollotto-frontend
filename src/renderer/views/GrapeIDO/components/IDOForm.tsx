import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import useReduxState from "../../../hooks/useReduxState";
import { AppState } from "../../../redux/stores/store";
import {
  sortTicketNumber,
} from "../../../../utils/helpers";
import NumberSelectorIDO from "../numberSelector/NumberSelector";
import reduxAction from "../../../redux/reduxAction";
import IDOButton from "./IDOButton";
import { sendWinnerNumbers } from "../utils/sendWinnerNumbers";
import { RandomTicketGenerator } from "../utils/randomWinnerNumbers";



export interface IusersProps {
  users: number;
}
export default function IDOForm({users}: IusersProps): JSX.Element {
  const [globalData, setGlobalData] = useReduxState(
    (state: AppState) => state.globalData
  );
  const [loading, setLoading] = useState(false);

  async function handleSubmitIDO() {
    const tempticketArr = RandomTicketGenerator(users) ;
    reduxAction({
      type: "SET_PURCHASE_DATA",
      arg: {
        ticketNumberArr: tempticketArr,
      },
    });
    const ticketNumbers = sortTicketNumber(tempticketArr);
    console.log(ticketNumbers);
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
        ticketNumArr: ticketNumbers,
      };

      setLoading(true);
      console.log(globalData.walletBalance);
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
        console.log(ticketData);
        const result = await sendWinnerNumbers(ticketData);
        if (result.success === true) {
          try {
            setLoading(false);
            reduxAction({ type: "RESET_PURCHASE_DATA", arg: null });
            (async () => {
              const balance: Promise<number> =
                await globalData.connection.getBalance(
                  globalData.selectedWallet.publicKey
                );
              console.log(balance);
              await setGlobalData({
                type: "SET_GLOBAL_DATA",
                arg: {
                  ...globalData,
                  walletBalance: globalData.walletBalance - 0.1 * 1000000000,
                },
              });
            })();
          
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

  return (
    <form onSubmit={handleSubmitIDO}>
      <NumberSelectorIDO  />

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
            {/* <RandomButton
              style={{ marginBottom: "20px" }}
              onClick={() => {
                reduxAction({
                  type: "SET_PURCHASE_DATA",
                  arg: {
                    ticketNumberArr: RandomTicketGenerator(),
                  },
                });
                handleSubmit()
              }}
            >
              Generate Random Ticket
            </RandomButton> */}
            <IDOButton handleSubmit={handleSubmitIDO} />
          </span>
        )}
      </div>
    </form>
  );
}
