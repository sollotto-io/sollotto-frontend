import "./index.scss";

const PoolDetailContent = ({
  poolDetail,
}: {
  poolDetail: {
    Pool: string;
    PrizePool: string;
    TimeRemaining: string;
    PoolARP: string;
    TotalDeposit: number;
    TotalLiquidity: number;
    Odds: string;
    PoolName: string;
  };
}) => {
  return (
    <section id="poolD">
      <h4> {poolDetail.PoolName}</h4>

      <div id="other-details">
        <section>
          <p>Pool Prize</p>
          <p>{poolDetail.PrizePool}</p>
        </section>
        <section>
          <p>APR</p>
          <p>{poolDetail.PoolARP}</p>
        </section>
        <section>
          <p>Deposits</p>
          <p>{poolDetail.TotalDeposit}</p>
        </section>
        <section>
          <p>Total Liquidity</p>
          <p>{poolDetail.TotalLiquidity}</p>
        </section>
        <section>
          <p>Odds</p>
          <p>{poolDetail.Odds}</p>
        </section>
      </div>
    </section>
  );
};

export default PoolDetailContent;
