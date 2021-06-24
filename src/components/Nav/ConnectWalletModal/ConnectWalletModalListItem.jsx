import React, { useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import useWallet from '../../hooks/useWallet';
import useDidUpdateEffect from '../../hooks/useDidUpdateEffect';
export default function ConnectWalletModalListItem({ name }) {
  const { globalData, setGlobalData } = useContext(GlobalContext);

  const [wallet, setWallet] = useWallet();

  useDidUpdateEffect(() => {
    setGlobalData({ ...globalData, selectedWallet: wallet });
  }, [wallet]);

  return (
    <li onClick={() => setWallet(name)} className="modalListItem greenBtn">
      <span className="modalListItemTitle">{name}</span>
    </li>
  );
}
