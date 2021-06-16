import React from 'react';
import '../css/charity.css';
import PageTitle from '../components/common/PageTitle';
import CharityTable from '../components/charity/charityTable.jsx';
import '../css/pool.css';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_ALL_CHARITIES } from '../graphql/queries';
import Loader from '../components/common/Loader';

export default function Charities() {
  const { loading: charityloading, data: charities } = useQuery(FETCH_ALL_CHARITIES);
  if(charityloading){
    return <Loader/>
  }else{

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
