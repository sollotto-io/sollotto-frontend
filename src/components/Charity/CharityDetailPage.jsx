import React from 'react';
import { useParams } from 'react-router';
import Loader from '../common/Loader';
import CDetail from './CDetails';
import CharityCommunitySelect from './CharityCommunitySelect';
import { useHistory } from 'react-router';
import CharityIntro from './CharityIntro';
import CharityExtraInfo from './CharityExtraInfo';
import { useSelector } from 'react-redux';

const CharitDetailPage = () => {
  const history = useHistory();
  const sendToCharity = () => {
    history.push(`/charities`);
  };

  const { charities } = useSelector((state) => state.globalData.charities);
  const { id } = useParams();
  const charityDetail = charities.find((p) => p.charityName === id);

  if (charityDetail) {
    return (
      <>
        <div className="detailSection">
          <div className="topSection">
            <CDetail charityDetail={charityDetail} />
            <CharityCommunitySelect charityDetail={charityDetail} />
          </div>
          <div className="bottomSection">
            <CharityIntro charityDetail={charityDetail} />
            <CharityExtraInfo charityDetail={charityDetail} />
          </div>
        </div>
      </>
    );
  } else if (charityDetail === undefined) {
    sendToCharity();
    return null;
  } else {
    return <Loader />;
  }
};
export default CharitDetailPage;
