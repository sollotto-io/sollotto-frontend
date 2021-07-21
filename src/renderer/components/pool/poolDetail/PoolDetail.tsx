import "./index.scss";
import { useParams } from "react-router";
import TimeRemaining from "./timeRemaining/TimeRemaining";
import PoolDetailContent from "./poolDetailContent/PoolDetailContent";
import WinningSection from "./winningSection/WinningSection";
import PoolExtraInfo from "./poolExtraInfo/PoolExtraInfo";
import Loader from "../../common/loader/Loader";
import useReduxState from "../../../hooks/useReduxState";

const PoolDetailPage = () => {
  const [globalData] = useReduxState((state) => state.globalData);
  const { id }: { id: string } = useParams();
  const poolDetail = globalData.pools.find(
    (p: {
      Pool: string;
      PrizePool: number;
      TimeRemaining: string;
      PoolARP: string;
      TotalDeposit: number;
      TotalLiquidity: number;
      Odds: string;
      PoolName: string;
    }) => p.Pool === id
  );
  return (
    <div className="detailSection">
      <div className="topSection">
        {poolDetail ? (
          <>
            {" "}
            <PoolDetailContent poolDetail={poolDetail} />
            <TimeRemaining time="0" />{" "}
          </>
        ) : (
          <Loader />
        )}
      </div>
      <div className="bottomSection">
        {poolDetail ? (
          <>
            <WinningSection poolDetail={poolDetail} />
            <PoolExtraInfo />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default PoolDetailPage;
