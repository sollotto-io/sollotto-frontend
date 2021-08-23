import PageTitle from "../../components/common/pageTitle/PageTitle";
import LaunchTable from "../../components/launch/launchTable/LaunchTable";
import "./index.scss";
export default function LaunchPad(): JSX.Element {
  return (
    <div className="launchpad-wrapper">
      <PageTitle title="Launchpad Lotteries"/>
      <LaunchTable />
    </div>
  );
}
