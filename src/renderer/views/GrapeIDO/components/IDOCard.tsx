import useReduxState from "../../../hooks/useReduxState";

import { AppState } from "../../../redux/stores/store";
import useDidUpdateEffect from "../../../hooks/useDidUpdateEffect";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import GreenGradientSvg2 from "../../../components/common/greenGradientSvg2/GreenGradientSvg2";
import GreenGradientSvg from "../../../components/common/greenGradientSvg/GreenGradientSvg";

import PurpleGradientSvg from "../../../components/common/purpleGradientSvg/PurpleGradientSvg";
import { IlotteryTicket } from "../../../api/types/lotteryData";
import IDOForm from "./IDOForm";
import { useState } from "react";


export default function PurchaseCard(): JSX.Element {


  const [users, setUsers]  = useState(0)
  const { ticketNumberArr, valid } = useSelector(
    (state: AppState) => state.purchaseData
  );
  const [{ loading, lotteryData }] = useReduxState(
    (state: AppState) => state.lotteryData
  );
  const handleUserChange  =(e: React.ChangeEvent<HTMLInputElement>) =>{
   
    setUsers(parseInt(e.target.value)) 
  }
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
              marginBottom:20,
              color: valid ? "#FFF" : "#ff604f",
            }}
          >
           Enter number of users : <span ><input type="number"  id="users" onChange={handleUserChange} /></span >
          </p>
          <IDOForm users = {users} />
          
         
        </div>
      </div>
    </div>
  );
}
