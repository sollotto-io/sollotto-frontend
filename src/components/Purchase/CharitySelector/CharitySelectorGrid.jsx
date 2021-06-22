import React, { useState, useContext, createContext } from 'react';
import SingleCharitySelector from './SingleCharitySelector';
import { PurchaseContext } from '../../../context/PurchaseContext';
import { LotteryContext } from '../../../context/LotteryContext';
import Loader from '../../common/Loader';

export const CharityDataContext = createContext(null);

export default function CharitySelectorGrid() {
 
  const { purchaseData, setPurchaseData } = useContext(PurchaseContext);
  const { lotteryData,loading } = useContext(LotteryContext);
  const [selectedCharityBtn, setSelectedCharityBtn] = useState(null);
  const [selectedCharityBlock, setSelectedCharityBlock] = useState(null);
  // eslint-disable-line react-hooks/exhaustive-deps

  //------------border and button styling while selected--------------------
  
  var charitySelectHandler = async (charityBtn, charityBlock, charityIndex) => {
    if (charityBtn === selectedCharityBtn) {
      charityBtn.classList.remove('active');
      charityBtn.innerHTML = 'SELECT';
      charityBlock.classList.add('psuedoGreyBg');
      charityBlock.querySelector('.charitySelectorIcon').classList.remove('blockDisplay');
      charityBlock.classList.remove('gradientBg');
      setSelectedCharityBtn(null);
      setPurchaseData({ ...purchaseData, selectedCharity: null });
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
        setPurchaseData({ ...purchaseData, selectedCharity: charityIndex });
      }
      charityBtn.classList.add('active');
      charityBtn.innerHTML = 'SELECTED';
      charityBlock.classList.remove('psuedoGreyBg');
      charityBlock.classList.add('gradientBg');
      charityBlock.querySelector('.charitySelectorIcon').classList.add('blockDisplay');
      setSelectedCharityBtn(charityBtn);
      setSelectedCharityBlock(charityBlock);
      setPurchaseData({ ...purchaseData, selectedCharity: charityIndex });

      // document.querySelectorAll('.charitySelectBtn').forEach(async (charity,index) => {
      // 	if (!charity.classList.contains('active')) {
      // 		charity.disabled = true;
      // 	}
      // });
    }
  };
  if(loading===true){
    return <Loader/>
  }
  else if (lotteryData ===null){
    return null

  }else{

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
