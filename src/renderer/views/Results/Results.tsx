import "./index.scss";
import PageTitle from "../../components/common/pageTitle/PageTitle";
import LotteryResults from "./lotteryResults/LotteryResults";
import PoolResults from "./poolResults/PoolResults";
import { useEffect } from "react";
import useFetchAllPools from "../../hooks/useFetchAllPools";
import LaunchPadResults from "./launchpadResults/LaunchpadResults";
import ResultDivider from "../../components/result/resultDivider/ResultDivider";
import Model4Results from "./model4Results/Model4Results";

export default function Results(): JSX.Element {
  const fetchAllPools = useFetchAllPools();
  useEffect(() => {
    (async () => {
      await fetchAllPools();
    })();
  }, []);
  return (
    <div className="pageWrapper">
      <div className="resultSection">
        <div id="resultHeader">
          <PageTitle title="Results" />
          <ResultDivider />
          <LotteryResults />
          <ResultDivider />
          <PoolResults />
          <ResultDivider />
          <LaunchPadResults />
          <ResultDivider />
          <Model4Results />
        </div>
      </div>
    </div>
  );
}
