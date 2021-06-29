import IconButton from '../common/iconButton';
import Logout from '../../images/svg/logout.svg';
import useReduxState from '../hooks/useReduxState';
export default function WalletDisconnect() {
  const [globalData] = useReduxState((state) => state.globalData);
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
