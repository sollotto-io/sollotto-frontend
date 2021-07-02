import React from 'react';
import '../css/charity.css';
import PageTitle from '../components/common/PageTitle';
import CharityTable from '../components/charity/CharityTable.jsx';
import '../css/pool.css';
import Loader from '../components/common/Loader';
import useReduxState from '../components/hooks/useReduxState';

export default function Charities({charityloading}) {
  const [globalData] = useReduxState((state) => state.globalData);
 
  if (charityloading) {
    return <Loader />;
  } else {
    return (
      <div className="pageWrapper">
        <div className="charitySection">
          <div id="poolHeader">
            <PageTitle title="Charities" />
          </div>
          {globalData.charities ? <CharityTable rows={globalData.charities.charities} /> : ''}
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
