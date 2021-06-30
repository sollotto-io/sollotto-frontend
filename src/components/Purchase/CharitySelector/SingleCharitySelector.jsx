import React, { useRef } from 'react';
import CharityImage from './CharityImage';
import CharityName from './CharityName';
import CharitySelectButton from './CharitySelectButton';
import SolLottoLogo from '../purchase-components/SolLottoLogo';
import { IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';
import useReduxState from '../../hooks/useReduxState';

const SingleCharitySelector = (props) => {
  const [lotteryState] = useReduxState((state) => state.lotteryData);

  const { lotteryData } = lotteryState;
  const singleCharityBlockRef = useRef(null);

  var charityBtnHandler = (charityBtn) => {
    props.charitySelectHandler(charityBtn, singleCharityBlockRef.current, props.charityId);
  };

  return (
    <div
      className="psuedoGreyBg psuedoBorder  singleCharitySelectorWrapper"
      ref={singleCharityBlockRef}
    >
      <div className="singleCharitySelector">
        <Link
          style={{ position: 'absolute', right: '5px' }}
          to={{pathname:`/charities/${lotteryData.Charities[props.index].charityName}`, state:{fromPurchase:true}}}
        >
          <IconButton id="info-circle">
            <InfoIcon style={{ fill: '#fff' }} />
          </IconButton>
        </Link>
        <SolLottoLogo charitySelectorIcon={true} />
        <CharityImage charityId={lotteryData.Charities[props.index].charityName} />
        <CharityName charityIndex={props.index} />
        <CharitySelectButton
          charityName={lotteryData.Charities[props.index].charityName}
          charityId={lotteryData.Charities[props.index].id}
          charityBtnHandler={charityBtnHandler}
        />
      </div>
    </div>
  );
};
export default SingleCharitySelector;
