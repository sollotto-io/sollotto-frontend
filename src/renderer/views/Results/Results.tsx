import "./index.scss";
import { useEffect } from "react";
import PageTitle from "../../components/common/pageTitle/PageTitle";
import PageSubTitle from "../../components/common/pageSubtitle/Subtitle";
import ResultTable from "../../components/result/resultTable/ResultTable";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ALL_LOTTERIES } from "../../../graphql/queries";
import Loader from "../../components/common/loader/Loader";
import { sortTicketNumber } from "../../../utils/helpers";
import { IDrawing } from "../../api/types/lotteryData";
import moment from "moment";

export default function Results(): JSX.Element {
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
      <div className="pageWrapper">
        <div className="resultSection">
          <div id="resultHeader">
            <PageTitle title="Results" />
          </div>

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
        </div>
      </div>
    );
  }
}
