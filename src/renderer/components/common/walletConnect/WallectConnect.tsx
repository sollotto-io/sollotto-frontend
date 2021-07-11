import React, { useEffect, useState } from "react";
import "./index.scss";
import useReduxState from "../../../hooks/useReduxState";
import PrimaryButton from "../primaryButton/PrimaryButton";
import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import ConnectWalletModal from "./walletConnectModal/ConnectWalletModal";

export default function WalletConnect(): JSX.Element {
  const [open, setOpen] = useState(false);
  /*   const walletId = useRef(); */
  const [globalData] = useReduxState((state) => state.globalData);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    if (globalData.walletConnectedFlag === false) {
      setOpen(true);
    }
  };
  useEffect(() => {
    if (globalData.walletConnectedFlag === true) {
      handleClose();
    }
  }, [globalData.walletConnectedFlag]);
  return (
    <>
      <PrimaryButton
        className={
          globalData.walletConnectedFlag === false
            ? "walletConnect"
            : "walletConnect greenBtnWOHover"
        }
        onClick={handleClickOpen}
      >
        <AccountBalanceWalletOutlinedIcon fontSize="small" />
        <span>
          {globalData.walletConnectedFlag === true
            ? `${globalData.selectedWallet.publicKey
                .toBase58()
                .substring(0, 4)} ... ${globalData.selectedWallet.publicKey
                .toBase58()
                .substring(
                  globalData.selectedWallet.publicKey.toBase58().length - 4
                )}`
            : "Connect"}
        </span>
      </PrimaryButton>
      <ConnectWalletModal
        /* walletId={walletId} */
        open={open}
        handleClose={handleClose}
      />{" "}
    </>
  );
}
