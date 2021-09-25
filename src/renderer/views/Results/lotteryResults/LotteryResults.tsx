import "./index.scss";
import PageSubTitle from "../../../components/common/pageSubtitle/Subtitle";
import ResultTable from "../../../components/result/lotteryResult/resultTable/ResultTable";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ALL_LOTTERIES } from "../../../../graphql/queries";
import Loader from "../../../components/common/loader/Loader";
import { sortTicketNumber } from "../../../../utils/helpers";
import { IDrawing } from "../../../api/types/lotteryData";
import { useEffect } from "react";
import moment from "moment";

export default function LotteryResults(): JSX.Element {
  const { loading, data, refetch } = useQuery(FETCH_ALL_LOTTERIES);
  // eslint-disable-next-line
  useEffect(() => {
    (() => refetch())();
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    const pastLotteries = data.getAllDrawing
      .filter((row: IDrawing) => new Date(row.EndDate) < new Date(Date.now()))
      .map((row: IDrawing) => {
        return { ...row, WinningNumbers: sortTicketNumber(row.WinningNumbers) };
      })
      .reverse();

    const nextLotteries = data.getAllDrawing
      .filter((row: IDrawing) => new Date(row.EndDate) > new Date(Date.now()))
      .map((row: IDrawing) => {
        return { ...row, WinningNumbers: sortTicketNumber(row.WinningNumbers) };
      });

    return (
      <>
        {nextLotteries.length > 0 ? (
          <>
            <PageSubTitle subtitle="Live Now" />
            <ResultTable loading={loading} rows={nextLotteries} />
          </>
        ) : (
          <>
            <PageSubTitle subtitle="Live Now" />
            <div className="coming-soon gradientBg gradientBorder">
              <div>
                <PageSubTitle subtitle="Not Yet" />
              </div>
            </div>
          </>
        )}
        {pastLotteries.length > 0 ? (
          <>
            <PageSubTitle subtitle="Past Lotteries" />
            <ResultTable loading={loading} rows={pastLotteries} />
          </>
        ) : (
          <>
            <PageSubTitle subtitle="Past Lotteries" />
            <div className="coming-soon gradientBg gradientBorder">
              <div>
                <PageSubTitle subtitle={`Live now`} />
                <PageSubTitle
                  subtitle={`Current drawing Date : ${moment(
                    nextLotteries[0].EndDate
                  ).format("MMM Do YY")}`}
                />
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
