import "./index.scss";
import TabView from "../../components/admin/Tab/Tab";
import { useState } from "react";
import CharityAdminTable from "../../components/admin/ChariyAdminTable/CharityAdminTable";
import Raffles from "../../components/admin/Raffles/Raffle";
import Statistics from "../../components/admin/Statistics/Statistics";
import useReduxState from "../../hooks/useReduxState";
export default function Admin(): JSX.Element {
  const [tabState, setTabState] = useState(0);
  const [globalData] = useReduxState(
    (state) => state.globalData
  );
  return (
    <div className="admin-wrapper">
      <TabView tabState={tabState} setTabState={setTabState} />
      {tabState === 0
        ? <CharityAdminTable rows = {globalData.charities.charities}/>
        : tabState === 1
        ? <Raffles/>
        : <Statistics/>}
    </div>
  );
}
