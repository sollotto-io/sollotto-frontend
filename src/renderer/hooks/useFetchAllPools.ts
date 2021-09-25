import { useLazyQuery } from "@apollo/react-hooks";
import { FETCH_ALL_POOLS, FETCH_LAUNCHES } from "../../graphql/queries";
import useTypedReduxState from "./useTypedReduxState";
export default function useFetchAllPools(): () => void {
  const [{ pools, launchPad }, setGlobalData] = useTypedReduxState(
    (state) => state.globalData
  );
  const [getPools] = useLazyQuery(FETCH_ALL_POOLS, {
    onCompleted: (e) => {
      setGlobalData({
        type: "SET_GLOBAL_DATA",
        arg: {
          pools: {
            ...pools,
            pools: e.getAllPools,
          },
        },
      });
    },
  });

  const [getLaunchs] = useLazyQuery(FETCH_LAUNCHES, {
    onCompleted: (e) => {
      setGlobalData({
        type: "SET_GLOBAL_DATA",
        arg: {
          launchPad: {
            ...launchPad,
            launchPad: e.getAllLaunched,
          },
        },
      });
    },
  });

  const fetchPools = async () => {
    if (pools.pools.length === 0 && launchPad.launchPad.length === 0) {
      await getPools();
      await getLaunchs();
    }
  };

  return fetchPools;
}
