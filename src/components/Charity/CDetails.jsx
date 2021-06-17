import { IconButton } from '@material-ui/core';
import React from 'react';
import SollotoGradient from '../common/sollotoGradient';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router';

const CDetails = ({ charityDetail }) => {
  const history = useHistory();
  const sendToCharity = () => {
    history.push(`/charities`);
  };

  return (
    <section id="poolC">
      <div id="charityHeader">
        <div id="back-button">
          <IconButton onClick={sendToCharity} style={{ color: 'white' }}>
            <ArrowBackIcon />
          </IconButton>
          <h4> {charityDetail.charityName}</h4>
        </div>
        <div>
          <SollotoGradient addedBy={charityDetail.addedBy} />
        </div>
      </div>
      <div id="other-details">
        <section>
          <p>Current Votes</p>
          <p>{charityDetail.currentVotes === null ? '-' : charityDetail.currentVotes}</p>
        </section>
        <section>
          <p>Lifetime Votes</p>
          <p>{charityDetail.lifeTimeVotes === null ? '-' : charityDetail.lifeTimeVotes}</p>
        </section>
        <section>
          <p>Lifetime Wins</p>
          <p>{charityDetail.lifeTimeWins === null ? '-' : charityDetail.lifeTimeWins}</p>
        </section>
      </div>
    </section>
  );
};

export default CDetails;
