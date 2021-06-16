import React, { useRef, useState, useEffect, useContext } from 'react';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import ConnectWalletModal from './ConnectWalletModal/ConnectWalletModal';
import { GlobalContext } from '../../context/GlobalContext';

export default function WalletConnect() {
  const [open, setOpen] = useState(false);
  const walletId = useRef();
  const { globalData } = useContext(GlobalContext);

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
      <button
        type="button"
        className={
          globalData.walletConnectedFlag === false
            ? 'walletConnect greenBtn globalBtn'
            : 'walletConnect greenBtnWOHover globalBtn'
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
                .substring(globalData.selectedWallet.publicKey.toBase58().length - 4)}`
            : 'Connect'}
        </span>
      </button>
      <ConnectWalletModal walletId={walletId} open={open} handleClose={handleClose} />{' '}
    </>
  );
}
