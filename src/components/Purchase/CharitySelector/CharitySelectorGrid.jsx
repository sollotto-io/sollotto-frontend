import React from 'react';
import SingleCharitySelector from './SingleCharitySelector';
import reduxAction from '../../../redux/reduxAction';
import useReduxState from '../../hooks/useReduxState';

import Loader from '../../common/Loader';

export default function CharitySelectorGrid() {
  const [lotteryState] = useReduxState((state) => state.lotteryData);

  const { lotteryData, loading } = lotteryState;
  // eslint-disable-line react-hooks/exhaustive-deps

  //------------border and button styling while selected--------------------

  const charitySelectHandler = async (charityIndex) => {
    if (charityIndex)
      reduxAction({
        type: 'SET_PURCHASE_DATA',
        arg: { selectedCharity: charityIndex },
      });
  };
  if (loading === true) {
    return <Loader />;
  } else if (lotteryData === null) {
    return null;
  } else {
    return (
      <div className="charitySelectorGrid">
        {lotteryData.Charities.map((charity, index) => {
          return (
            <SingleCharitySelector
              charityId={charity.id}
              index={index}
              key={index}
              charitySelectHandler={charitySelectHandler}
            />
          );
        })}
      </div>
    );
  }
}
