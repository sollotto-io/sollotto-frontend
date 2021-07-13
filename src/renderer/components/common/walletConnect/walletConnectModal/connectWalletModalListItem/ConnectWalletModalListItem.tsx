import "./index.scss";
import useReduxState from "../../../../../hooks/useReduxState";
import useDidUpdateEffect from "../../../../../hooks/useDidUpdateEffect";
import useWallet from "../../../../../hooks/useWallet";

export default function ConnectWalletModalListItem({
  name,
}: {
  name: string;
  handleClose?: () => void;
}): JSX.Element {
  const [, setGlobalData] = useReduxState((state) => state.globalData);

  const [wallet, setWallet] = useWallet();

  useDidUpdateEffect(() => {
    if (wallet !== null) {
      setGlobalData({
        type: "SET_GLOBAL_DATA",
        arg: { selectedWallet: wallet },
      });
    }
  }, [wallet]);

  return (
    <li onClick={() => setWallet(name)} className="modalListItem greenBtn">
      <span className="modalListItemTitle">{name}</span>
    </li>
  );
}
