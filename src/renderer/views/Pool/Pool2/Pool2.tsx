import "./index.scss";
import PageTitle from "../../../components/common/pageTitle/PageTitle";
import PoolTable from "../../../components/pool/poolTable/PoolTable";

export default function Pool2(): JSX.Element {
  return (
    <div className="pageWrapper ">
      <div className="pools">
        <PageTitle title="Pools" />
        <PoolTable
          rows={[
            {
              Pool: "Sol",
              PrizePool: 100.034,
              TimeRemaining: "2021-08-25",
              yourDeposit: 10,
              TotalDeposit: 100,
            },
          ]}
        />
      </div>
    </div>
  );
}
