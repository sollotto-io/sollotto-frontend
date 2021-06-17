import React, { useContext, useEffect } from 'react';
import '../css/charity.css';
import PageTitle from '../components/common/PageTitle';
import CharityTable from '../components/Charity/CharityTable.jsx';
import '../css/pool.css';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_ALL_CHARITIES } from '../graphql/queries';
import Loader from '../components/common/Loader';
import { GlobalContext } from '../context/GlobalContext';

export default function Charities() {
  const { loading: charityloading, data: charities } = useQuery(FETCH_ALL_CHARITIES);
  const { globalData, setGlobalData } = useContext(GlobalContext);

  useEffect(() => {
    if (charityloading === false) {
      setGlobalData({
        ...globalData,
        charities: charities.getAllCharities,
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
        </div>
      </div>
    );
  }
}
