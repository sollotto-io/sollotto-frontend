import React, { useEffect } from 'react';
import '../css/charity.css';
import PageTitle from '../components/common/PageTitle';
import CharityTable from '../components/Charity/CharityTable.jsx';
import '../css/pool.css';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_ALL_CHARITIES } from '../graphql/queries';
import Loader from '../components/common/Loader';
import useReduxState from '../components/hooks/useReduxState';

export default function Charities() {
  const { loading: charityloading, data: charities } = useQuery(FETCH_ALL_CHARITIES);
  const [globalData, setGlobalData] = useReduxState((state) => state.globalData);

  useEffect(() => {
    if (charityloading === false) {
      setGlobalData({
        type: 'SET_GLOBAL_DATA',
        arg: {
          ...globalData,
          charities: charities.getAllCharities,
        },
      });
    }
  }, [charityloading]); // eslint-disable-line react-hooks/exhaustive-deps

  if (charityloading) {
    return <Loader />;
  } else {
    return (
      <div className="pageWrapper">
        <div className="charitySection">
          <div id="poolHeader">
            <PageTitle title="Charities" />
          </div>
          {charities ? <CharityTable rows={charities.getAllCharities} /> : ''}
          <div id="suggest-charity">
            <h4>Suggest</h4>
            <p>
              Want to suggest a charity to be included on the SolLotto platform? Please fill out the
              form here.
            </p>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdMRU7GzeNDukSv-Gq9VJk_rtjVxR5CL-M33GZn8fjrCNxmwA/viewform"
              target="_blank"
              rel="noreferrer"
              className="greenBtn globalBtn"
            >
              Suggest a Charity
            </a>
          </div>
        </div>
      </div>
    );
  }
}
