import { useSelector } from "react-redux";
import reduxAction from "../redux/reduxAction";
import { AppState } from "../redux/stores/store";

type TuseReduxState<T> = (store: AppState) => T;

const useTypedReduxState = <K,>(
  state: TuseReduxState<K>
): [K, typeof reduxAction] => {
  const reduxState = useSelector(state);

  return [reduxState, reduxAction];
};

export default useTypedReduxState;
