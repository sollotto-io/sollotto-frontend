import { useSelector } from "react-redux";
import reduxAction from "../redux/reduxAction";
import { AppState } from "../redux/stores/store";

/*eslint-disable  @typescript-eslint/no-explicit-any */

type TuseReduxState = (state: AppState) => any;
const useReduxState = (state: TuseReduxState): [any, (s: any) => void] => {
  const reduxState = useSelector(state);

  return [reduxState, reduxAction];
};

export default useReduxState;
