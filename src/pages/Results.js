import React, { useEffect } from 'react';
import PageTitle from '../components/common/PageTitle';
import PageSubTitle from '../components/common/PageSubtitle';
import '../css/result.css';
import ResultTable from '../components/Result/ResultTable';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_ALL_LOTTERIES } from '../graphql/queries';
import Loader from '../components/common/Loader';
import { sortTicketNumber } from '../components/utils/hepers';

export default function Results() {
  const { loading, data, refetch } = useQuery(FETCH_ALL_LOTTERIES);
  // eslint-disable-next-line
  useEffect(() => refetch(), []);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="pageWrapper">
        <div className="resultSection">
          <div id="resultHeader">
            <PageTitle title="Result" />
          </div>
          <PageSubTitle subtitle="Coming Soon" />

          <ResultTable
            loading={loading}
            rows={data.getAllDrawing
              .filter((row) => new Date(row.EndDate) > Date.now())
              .map((row) => {
                return { ...row, WinningNumbers: sortTicketNumber(row.WinningNumbers) };
              })}
          />

          <PageSubTitle subtitle="Past Lotteries" />
          <ResultTable
            loading={loading}
            rows={data.getAllDrawing
              .filter((row) => new Date(row.EndDate) < Date.now())
              .map((row) => {
                return { ...row, WinningNumbers: sortTicketNumber(row.WinningNumbers) };
              })}
          />
        </div>
      </div>
    );
  }
}
