import React, { useEffect } from 'react';
import PageTitle from '../components/common/PageTitle';
import PageSubTitle from '../components/common/PageSubtitle';
import '../css/result.css';
import ResultTable from '../components/Result/ResultTable';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_ALL_LOTTERIES } from '../graphql/queries';
import Loader from '../components/common/Loader';
import { sortTicketNumber } from '../components/utils/helpers';
import moment from 'moment';

export default function Results() {
  const { loading, data, refetch } = useQuery(FETCH_ALL_LOTTERIES);
  // eslint-disable-next-line
  useEffect(() => refetch(), []);

  if (loading) {
    return <Loader />;
  } else {
    const pastLotteries = data.getAllDrawing
      .filter((row) => new Date(row.EndDate) < Date.now())
      .map((row) => {
        return { ...row, WinningNumbers: sortTicketNumber(row.WinningNumbers) };
      })
      .reverse();

    const nextLotteries = data.getAllDrawing
      .filter((row) => new Date(row.EndDate) > Date.now())
      .map((row) => {
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
                    subtitle={`Current drawing Date : ${moment(nextLotteries[0].EndDate).format(
                      'MMM Do YY',
                    )}`}
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
