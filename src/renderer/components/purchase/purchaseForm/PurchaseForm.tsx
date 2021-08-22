import React, { useState } from "react";
import NumberSelector from "./numberSelector/NumberSelector";
import CharitySelector from "./charitySelector/CharitySelector";
import PurchaseButton from "./purchaseButton/PurchaseButton";
import { ToastContainer, toast } from "react-toastify";
import { ticketPurchase } from "../utils/ticketPurchase";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { POST_TICKET } from "../../../../graphql/mutations";
import { FETCH_LOTTERY_DATA_ACCOUNT, FETCH_SINGLE_USER } from "../../../../graphql/queries";
import CircularProgress from "@material-ui/core/CircularProgress";
import { AppState } from "../../../redux/stores/store";
import { ICharity } from "../../../api/types/globalData";
import TicketPrice from "../ticketPrice/TicketPrice";

import {
  sortTicketNumber,
  ticketNumberValidator,
} from "../../../../utils/helpers";
import { useSelector } from "react-redux";
import reduxAction from "../../../redux/reduxAction";
import useReduxState from "../../../hooks/useReduxState";
import { Link } from "react-router-dom";

export default function PurchaseForm(): JSX.Element {
  const [addTicket] = useMutation(POST_TICKET);
  const [globalData, setGlobalData] = useReduxState(
    (state: AppState) => state.globalData
  );
  const [{ lotteryData, refetch }, setLotteryData] = useReduxState(
    (state: AppState) => state.lotteryData
  );

  const { ticketNumberArr, selectedCharity } = useSelector(
    (state: AppState) => state.purchaseData
  );
  const [loading, setLoading] = useState(false);
  const { data: user, refetch: userRefetch } = useQuery(FETCH_SINGLE_USER, {
    variables: {
      UserPK:
        globalData.selectedWallet &&
        globalData.selectedWallet.publicKey &&
        globalData.selectedWallet.publicKey.toString(),
    },
    skip: !globalData.selectedWallet,
  });

  async function handleSubmit() {
    const ticketNumbers = sortTicketNumber(ticketNumberArr);

    if (selectedCharity === null) {
      toast.warn("Please Select A Charity", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    } else if (ticketNumberValidator(ticketNumbers)) {
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
        charityId: selectedCharity,
        userWalletPK: globalData.selectedWallet.publicKey.toBytes(),
        ticketNumArr: ticketNumbers,
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
        const result = await ticketPurchase(ticketData);
        if (result.success === true) {
          try {
            await addTicket({
              variables: {
                DataWallet: Buffer.from(result.DataWallet as Buffer).toJSON()
                  .data,
                walletID: Buffer.from(
                  globalData.selectedWallet.publicKey.toBytes()
                ).toJSON().data,
                ticketArray: ticketNumbers,
                charityId: ticketData.charityId,
                drawingId: lotteryData.id,
                TransactionId: result.signature,
                UserPK: globalData.selectedWallet.publicKey.toString(),
              },
            });
            const dataUpdated = await refetch();
            await setLotteryData({
              type: "SET_LOTTERY_DATA",
              arg: {
                ...lotteryData,
                lotteryData: dataUpdated.data.getActiveDrawing,
              },
            });

            setLoading(false);
            reduxAction({ type: "RESET_PURCHASE_DATA", arg: null });
            (async () => {
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
                Ticket purchase is successful, your purchased tickets can be
                found on the results page, under the day of your drawing
                <br />
                <br />
                Ticket Number:&nbsp;
                {[...ticketNumberArr]
                  .splice(0, ticketNumberArr.length - 1)
                  .join(",")}
                ,{ticketNumberArr[5]}
                <br />
                Charity:&nbsp;
                {
                  lotteryData.Charities[
                    lotteryData.Charities.findIndex(
                      (charity: ICharity) => charity.id === ticketData.charityId
                    )
                  ].charityName
                }
                <br />
                <Link
                  style={{ textDecoration: "underline" }}
                  to={`/results/${lotteryData.id}`}
                >
                  View Your Ticket
                </Link>
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

            reduxAction({ type: "RESET_PURCHASE_DATA", arg: null });
            (async () => {
              await userRefetch();
              await setGlobalData({
                type: "SET_GLOBAL_DATA",
                arg: {
                  user: user.getSingleUser,
                },
              });
            })();
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
    <form onSubmit={handleSubmit}>
      <NumberSelector />
      <CharitySelector />
      <ToastContainer className="toast-container" />
      <div className="purchaseCardFooter">
        <TicketPrice />
        {loading ? (
          <span style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress size={30} />
          </span>
        ) : (
          <span style={{ display: "flex", justifyContent: "center" }}>
            <PurchaseButton handleSubmit={handleSubmit} />
          </span>
        )}
      </div>
    </form>
  );
}
