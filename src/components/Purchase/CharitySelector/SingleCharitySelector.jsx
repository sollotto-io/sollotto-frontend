import React, { useRef, useState, useEffect, useCallback } from 'react';
import CharityImage from './CharityImage';
import CharityName from './CharityName';
import SolLottoLogo from '../purchase-components/SolLottoLogo';
import { IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';
import useReduxState from '../../hooks/useReduxState';

const SingleCharitySelector = ({ index, charitySelectHandler, charityId }) => {
  const [lotteryState] = useReduxState((state) => state.lotteryData);
  const [{ selectedCharity }] = useReduxState((state) => state.purchaseData);
  const { lotteryData } = lotteryState;
  const singleCharityBlockRef = useRef(null);

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (selected) charitySelectHandler(charityId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    setSelected(selectedCharity === charityId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCharity]);

  const handleSelection = useCallback(() => {
    setSelected(!selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div
      className={`${
        selected ? 'gradientBg givepadding' : 'psuedoGreyBg'
      } psuedoBorder  singleCharitySelectorWrapper`}
      ref={singleCharityBlockRef}
      onClick={handleSelection}
      style={{ cursor: 'pointer' }}
    >
      <div className="singleCharitySelector">
        <Link
          style={{ position: 'absolute', right: '5px' }}
          to={{
            pathname: `/charities/${lotteryData.Charities[props.index].charityName}`,
            state: { fromPurchase: true },
          }}
        >
          <IconButton id="info-circle">
            <InfoIcon style={{ fill: '#fff' }} />
          </IconButton>
        </Link>

        <CharityImage charityId={lotteryData.Charities[index].charityName} />
        <CharityName charityIndex={index} />
        <SolLottoLogo selected={selected} charitySelectorIcon={true} />
      </div>
    </div>
  );
};
export default SingleCharitySelector;
