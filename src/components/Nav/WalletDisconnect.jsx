import { useContext } from 'react';
import IconButton from '../common/iconButton';
import Logout from '../../images/svg/logout.svg';
import { GlobalContext } from '../../context/GlobalContext';
export default function WalletDisconnect() {
  const { globalData } = useContext(GlobalContext);
  return (
    <IconButton
      tooltip={'logout'}
      icon={Logout}
      onClick={() => {
        globalData.selectedWallet.disconnect();
      }}
      style={{ width: '25px', cursor: 'pointer' }}
    />
  );
}
