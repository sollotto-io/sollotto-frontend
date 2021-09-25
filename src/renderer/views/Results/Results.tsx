import "./index.scss";
import PageTitle from "../../components/common/pageTitle/PageTitle";
import LotteryResults from "./lotteryResults/LotteryResults";
import PoolResults from "./poolResults/PoolResults";
import { useEffect } from "react";
import useFetchAllPools from "../../hooks/useFetchAllPools";

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
          <LotteryResults />
          <PoolResults />
        </div>
      </div>
    </div>
  );
}
