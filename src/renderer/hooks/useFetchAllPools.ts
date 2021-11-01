import { useLazyQuery } from "@apollo/react-hooks";
import {
  FETCH_ALL_POOLS,
  FETCH_LAUNCHES,
  FETCH_MODEL_4,
} from "../../graphql/queries";
import useTypedReduxState from "./useTypedReduxState";
export default function useFetchAllPools(): () => void {
  const [{ pools, launchPad, model4 }, setGlobalData] = useTypedReduxState(
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

  const [getModel4] = useLazyQuery(FETCH_MODEL_4, {
    onCompleted: (e) => {
      setGlobalData({
        type: "SET_GLOBAL_DATA",
        arg: {
          model4: e.getModel4,
        },
      });
    },
  });
  const fetchPools = async () => {
    if (
      pools.pools.length === 0 ||
      launchPad.launchPad.length === 0 ||
      model4.endDate === ""
    ) {
      await getPools();
      await getLaunchs();
      await getModel4();
    }
  };

  return fetchPools;
}
