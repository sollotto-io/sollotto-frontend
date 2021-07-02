import React from 'react';
import useWallet from '../../hooks/useWallet';
import useDidUpdateEffect from '../../hooks/useDidUpdateEffect';
import useReduxState from '../../hooks/useReduxState';
export default function ConnectWalletModalListItem({ name, handleClose }) {
  const [, setGlobalData] = useReduxState((state) => state.globalData);

  const [wallet, setWallet] = useWallet();

  useDidUpdateEffect(() => {
    if (wallet !== null) {
      setGlobalData({ type: 'SET_GLOBAL_DATA', arg: { selectedWallet: wallet } });
    }
  }, [wallet]);

  return (
    <li onClick={() => setWallet(name)} className="modalListItem greenBtn">
      <span className="modalListItemTitle">{name}</span>
    </li>
  );
}
