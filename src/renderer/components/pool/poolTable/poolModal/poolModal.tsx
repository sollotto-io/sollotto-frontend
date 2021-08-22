import "./index.scss";
import React, { useState } from "react";
import "./index.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useReduxState from "../../../../hooks/useReduxState";

import SollottoModal from "../../../common/sollottoModal/SollottoModal";

export default function PoolModal({
  id,
  rowIndex,
  tokenName,
}: {
  id: string;
  rowIndex: number;
  tokenName: string;
}): JSX.Element {
  console.log(id, rowIndex);
  const [modal, setModal] = useState(false);
  const [{ walletConnectedFlag }] = useReduxState((state) => state.globalData);

  const handleModalOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!walletConnectedFlag) {
      toast.error("Please Connect Your Wallet", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setModal(!modal);
    }
  };
  return (
    <>
      <button
        className="deposit-btn gradientBg gradientBorder"
        onClick={handleModalOpen}
      >
        Deposit
      </button>
      <SollottoModal
        title="Deposit"
        inputLabel={tokenName}
        countTitle="Amount Left"
        open={modal}
        handleClose={() => setModal(false)}
        onSubmit={(value) => console.log(value)}
        max={5}
        disablevalidation={true}
      />
    </>
  );
}
