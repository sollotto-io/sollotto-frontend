import "./index.scss";
import TabView from "../../components/admin/Tab/Tab";
import { useEffect, useState } from "react";
import CharityAdminTable from "../../components/admin/Charities/AdminCharity";
import Raffles from "../../components/admin/Raffles/Raffle";
// import Statistics from "../../components/admin/Statistics/Statistics";
import LaunchPad from "../../components/admin/LaunchPad/LaunchPad";
/* import Statistics from "../../components/admin/Statistics/Statistics"; */
import AdminPool from "../../components/admin/pool/AdminPool";
import useReduxState from "../../hooks/useReduxState";
import { FETCH_RAFFLES, FETCH_ALL_POOLS } from "../../../graphql/queries";
import { useQuery } from "@apollo/react-hooks";

export default function Admin(): JSX.Element {
  const { loading, data, refetch } = useQuery(FETCH_RAFFLES);
  const {
    loading: loadingPools,
    data: poolData,
    refetch: poolRefetch,
  } = useQuery(FETCH_ALL_POOLS);
  const [globalData, setGlobalData] = useReduxState(
    (state) => state.globalData
  );
  const [tabState, setTabState] = useState(0);
  useEffect(() => {
    if (!loading) {
      setGlobalData({
        type: "SET_GLOBAL_DATA",
        arg: {
          ...globalData,
          raffles: {
            refetch: refetch,
            raffles: data.getAllRaffle,
          },
          launchPad:{
            launchPad: data.getAllLaunched
          }
        },
      });
    }

    if (!loadingPools) {
      console.log(poolData);
      setGlobalData({
        type: "SET_GLOBAL_DATA",
        arg: {
          ...globalData,
          pools: {
            refetch: poolRefetch,
            pools: poolData.getAllPools,
          },
        },
      });
    }
  }, [loading, loadingPools]);
  return (
    <div className="admin-wrapper">
      <TabView tabState={tabState} setTabState={setTabState} />
      {tabState === 0 ? (
        <CharityAdminTable rows={globalData.charities.charities} />
      ) : tabState === 1 ? (
        <Raffles data={globalData.raffles.raffles} />
      ) : tabState === 2 ?<AdminPool data={globalData.pools.pools} /> :  (
        <LaunchPad data = {globalData.launchPad.launchPad} />
      )}
    </div>
  );
}
