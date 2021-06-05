import React, { useContext, useEffect, useMemo, useState } from "react";
import WalletConnect from "../Nav/WalletConnect";
import { PurchaseContext } from "../../context/PurchaseContext";
import { GlobalContext } from "../../context/GlobalContext";
// import {initLottery} from "./util/initLottery";
import { ticketPurchase } from "./util/ticketPurchase";
import { lotteryDraw } from "./util/lotteryDraw";
import { useMutation, useQuery } from "@apollo/client";
import { POST_TICKET } from "../../graphql/mutations";
import {FETCH_TICKET} from '../../graphql/queries'
/**
 * Borsh schema definition for greeting accounts
 */

/**
 * The expected size of each greeting account.
 */
// const LOTTERY_DATA_SIZE = borsh.serialize(
//   LotteryDataSchema,
//   new LotteryDataAccount(),
// ).length;

export default function PurchaseButton({ selectedCharity, Numbers }) {
  const { purchaseData } = useContext(PurchaseContext);
  const { globalData } = useContext(GlobalContext);

  const [addTicket] = useMutation(POST_TICKET);
  const {loading, data} = useQuery(FETCH_TICKET)

  

  const connectWalletBtn = () => {
    return <WalletConnect />;
  };
  const getTicket = async () => {
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
            LotteryId:globalData.currentLottery.Id
          },
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("falider");
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
        <button
          type="button"
          onClick={() => lotteryDraw(data)}
          className="greenBtn globalBtn"
        >
          Draw Lottery
        </button>
        {/* <button type="button" onClick={() => initLottery(globalData)} className="greenBtn globalBtn">Init Lottery</button> */}
        {/* <ConnectWalletModal open={open} handleClose={handleClose} /> */}
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
