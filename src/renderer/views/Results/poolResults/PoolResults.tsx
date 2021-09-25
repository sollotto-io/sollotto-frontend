import "./index.scss";
import PageSubTitle from "../../../components/common/pageSubtitle/Subtitle";
import PoolResultsTable from "../../../components/result/poolResult/poolResultTable/PoolResultTable";
export default function PoolResults(): JSX.Element {
  return (
    <>
      <PageSubTitle subtitle="Past Pools" />
      <PoolResultsTable />
    </>
  );
}
