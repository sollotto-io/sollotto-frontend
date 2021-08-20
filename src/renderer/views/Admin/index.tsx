import "./index.scss";
import TabView from "../../components/admin/Tab/Tab";
import { useEffect, useState } from "react";
import CharityAdminTable from "../../components/admin/Charities/AdminCharity";
import Raffles from "../../components/admin/Raffles/Raffle";
// import Statistics from "../../components/admin/Statistics/Statistics";
import LaunchPad from "../../components/admin/LaunchPad/LaunchPad";
import useReduxState from "../../hooks/useReduxState";
import { FETCH_RAFFLES } from "../../../graphql/queries";
import { useQuery } from "@apollo/react-hooks";
export default function Admin(): JSX.Element {
  const { loading, data, refetch } = useQuery(FETCH_RAFFLES);
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
  }, [loading]);
  return (
    <div className="admin-wrapper">
      <TabView tabState={tabState} setTabState={setTabState} />
      {tabState === 0 ? (
        <CharityAdminTable rows={globalData.charities.charities} />
      ) : tabState === 1 ? (
        <Raffles data={globalData.raffles.raffles} />
      ) : (
        <LaunchPad data = {globalData.launchPad.launchPad} />
      )}
    </div>
  );
}
