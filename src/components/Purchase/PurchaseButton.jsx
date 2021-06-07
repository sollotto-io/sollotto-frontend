import React, { useContext} from "react";
import WalletConnect from "../Nav/WalletConnect";
import { PurchaseContext } from "../../context/PurchaseContext";
import { GlobalContext } from "../../context/GlobalContext";

import { ticketPurchase } from "./util/ticketPurchase";

import { useMutation } from "@apollo/react-hooks";
import { POST_TICKET } from "../../graphql/mutations";
import { toast } from "react-toastify";


export default function PurchaseButton({ selectedCharity, Numbers }) {
  const { purchaseData } = useContext(PurchaseContext);
  const { globalData } = useContext(GlobalContext);

  const [addTicket] = useMutation(POST_TICKET);

  

  const connectWalletBtn = () => {
    return <WalletConnect />;
  };
  const getTicket = async () => {
    if (
      purchaseData.selectedCharity != null &&
      purchaseData.ticketNumberArr.length === 6 &&
      purchaseData.ticketNumberArr.every((element) => element != null)
    ) {
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
        return;
      }
      let purchaseDataArr = {
        charityId: purchaseData.selectedCharity,
        userWalletPK: globalData.selectedWallet.publicKey.toBytes(),
        ticketNumArr: purchaseData.ticketNumberArr,
      };

      const result = await ticketPurchase(globalData, purchaseDataArr);

      if (result.success) {
        try {
          addTicket({
            variables: {
              DataWallet: Buffer.from(result.DataWallet).toJSON().data,
              walletID: Buffer.from(
                globalData.selectedWallet.publicKey.toBytes()
              ).toJSON().data,
              ticketArray: purchaseData.ticketNumberArr,
              charityId: purchaseData.selectedCharity,
              LotteryId: globalData.currentLottery.Id,
            },
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        toast.error("Ticket Purchase Unsuccessful", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("Please pick all numbers and a charity", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
  };
 
  const getTicketBtn = () => {
    return (
      <>
        <button
          type="button"
          onClick={getTicket}
          className="greenBtn globalBtn"
        >
          Get a Ticket
        </button>
      </>
    );
  };
  return (
    <>
      {globalData.walletConnectedFlag === true
        ? getTicketBtn()
        : connectWalletBtn()}
    </>
  );
}
