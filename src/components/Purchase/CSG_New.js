import React, { useState, createContext } from 'react';
import SingleCharitySelector from './SingleCharitySelector';

import reduxAction from '../../redux/reduxAction';

export const CharityDataContext = createContext(null);
useReduxState((state) => state.lotteryData);
export default function CharitySelectorGrid() {
  const [lotteryState] = useReduxState((state) => state.lotteryData);

  const { lotteryData } = lotteryState;
  const [selectedCharityBtn, setSelectedCharityBtn] = useState(null);
  const [selectedCharityBlock, setSelectedCharityBlock] = useState(null);

  var charitySelectHandler = async (charityBtn, charityBlock, charityIndex) => {
    if (charityBtn === selectedCharityBtn) {
      charityBtn.classList.remove('active');
      charityBtn.innerHTML = 'SELECT';
      charityBlock.classList.add('psuedoGreyBg');
      charityBlock.querySelector('.charitySelectorIcon').classList.remove('blockDisplay');
      charityBlock.classList.remove('gradientBg');
      setSelectedCharityBtn(null);
      reduxAction({ type: 'SET_PURCHASE_DATA', arg: { selectedCharity: null } });
      document.querySelectorAll('.charitySelectBtn').forEach(async (charity) => {
        if (!charity.classList.contains('active')) {
          charity.disabled = false;
        }
      });
    } else if (charityBtn !== selectedCharityBtn) {
      if (selectedCharityBtn !== null) {
        selectedCharityBtn.classList.remove('active');
        selectedCharityBtn.innerHTML = 'SELECT';
        selectedCharityBlock.classList.add('psuedoGreyBg');
        selectedCharityBlock.querySelector('.charitySelectorIcon').classList.remove('blockDisplay');
        selectedCharityBlock.classList.remove('gradientBg');

        charityBtn.classList.add('active');
        charityBtn.innerHTML = 'SELECTED';
        charityBlock.classList.remove('psuedoGreyBg');
        charityBlock.classList.add('gradientBg');
        charityBlock.querySelector('.charitySelectorIcon').classList.add('blockDisplay');
        setSelectedCharityBtn(charityBtn);
        setSelectedCharityBlock(charityBlock);
        reduxAction({
          type: 'SET_PURCHASE_DATA',
          arg: { selectedCharity: charityIndex },
        });
      }
      charityBtn.classList.add('active');
      charityBtn.innerHTML = 'SELECTED';
      charityBlock.classList.remove('psuedoGreyBg');
      charityBlock.classList.add('gradientBg');
      charityBlock.querySelector('.charitySelectorIcon').classList.add('blockDisplay');
      setSelectedCharityBtn(charityBtn);
      setSelectedCharityBlock(charityBlock);
      reduxAction({ type: 'SET_PURCHASE_DATA', arg: { selectedCharity: charityIndex } });
    }
  };

  return (
    <div className="charitySelectorGrid">
      {lotteryData.charities.map((charity, index) => {
        return (
          <SingleCharitySelector
            charityId={charity.ID}
            index={index}
            key={index}
            charitySelectHandler={charitySelectHandler}
          />
        );
      })}
    </div>
  );
}
