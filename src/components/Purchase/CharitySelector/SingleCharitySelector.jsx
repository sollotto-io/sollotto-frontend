import React, { useRef, useContext } from 'react';
import CharityImage from './CharityImage';
import CharityName from './CharityName';
import CharitySelectButton from './CharitySelectButton';
import SolLottoLogo from '../purchase-components/SolLottoLogo';
import { IconButton } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {Link} from 'react-router-dom';
import { LotteryContext } from '../../../context/LotteryContext';


const SingleCharitySelector = (props) => {
  const { lotteryData } = useContext(LotteryContext);
  const singleCharityBlockRef = useRef(null);

  var charityBtnHandler = (charityBtn) => {
    props.charitySelectHandler(charityBtn, singleCharityBlockRef.current, props.charityId);
  };

  return (
    <div
      className="psuedoGreyBg psuedoBorder singleCharitySelectorWrapper"
      ref={singleCharityBlockRef}
    >
      <div className="singleCharitySelector">
      <Link to={`/charities/${lotteryData.Charities[props.index].charityName}`}>
          <IconButton
            id="info-circle"
          >
            <InfoOutlinedIcon />
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
