import React, { useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import useWallet from '../../hooks/useWallet';
import useDidUpdateEffect from '../../hooks/useDidUpdateEffect';
export default function ConnectWalletModalListItem({ name, handleClose }) {
  const { globalData, setGlobalData } = useContext(GlobalContext);

  const [wallet, setWallet] = useWallet();

  useDidUpdateEffect(() => {
    if (wallet !== null) {
      setGlobalData({ ...globalData, selectedWallet: wallet });
    }
  }, [wallet]);

  return (
    <li onClick={() => setWallet(name)} className="modalListItem greenBtn">
      <span className="modalListItemTitle">{name}</span>
    </li>
  );
}
