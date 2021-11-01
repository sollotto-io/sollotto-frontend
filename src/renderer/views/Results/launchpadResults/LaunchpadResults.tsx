import "./index.scss";
import PageSubTitle from "../../../components/common/pageSubtitle/Subtitle";
import LaunchPadResultsTable from "../../../components/result/launchpadResult/LaunchpadResultTable/LaunchPadResultTable";
export default function LaunchPadResults(): JSX.Element {
  return (
    <>
      <PageSubTitle subtitle="Past Launches" />
      <LaunchPadResultsTable />
    </>
  );
}
