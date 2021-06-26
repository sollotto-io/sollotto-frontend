import React, { useContext } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router';
import checkIfWinner from './utils/checkIfWinner';
import { GlobalContext } from '../../context/GlobalContext';
import moment from 'moment';
import { sortTicketNumber } from '../utils/helpers';

const RDetail = ({ lotteryData }) => {
  const { globalData } = useContext(GlobalContext);

  const history = useHistory();
  const sendToResults = () => {
    history.push(`/results/`);
  };
  var EndDate = moment(lotteryData.EndDate);
  var Today = moment();

  var dif = EndDate.diff(Today);

  const WinningNumbers = sortTicketNumber(lotteryData.WinningNumbers);
  function userResult() {
    let result = null;

    if (lotteryData.WinnerWallet.length === 0) {
      if (lotteryData.isActive === true) {
        result = <p>TBD</p>;
      } else if (lotteryData.isActive === false) {
        if (dif > 0) {
          result = <p>TBD</p>;
        } else {
          result = <p>Lost</p>;
        }
      }
    } else {
      if (checkIfWinner(lotteryData, globalData.selectedWallet.publicKey.toBytes())) {
        result = <p>Won</p>;
      } else {
        result = <p>Lost</p>;
      }
    }
    return result;
  }
  if (lotteryData) {
    return (
      <section id="poolC">
        <div id="charityHeader">
          <div id="back-button">
            <IconButton onClick={sendToResults} style={{ color: 'white' }}>
              <ArrowBackIcon />
            </IconButton>
            <h4>Pick 6</h4>
          </div>
          <div>
            <h4>{moment(lotteryData.EndDate).format('LL')}</h4>
          </div>
        </div>
        <div id="other-details">
          <section>
            <p>Prize Pool</p>
            <p>
              {lotteryData.TotalPoolValue === null ? 'TBD' : lotteryData.TotalPoolValue.toFixed(2)}
            </p>
          </section>
          <section>
            <p>Total Winners</p>
            <p>{lotteryData.WinnerWallet.length}</p>
          </section>
          <section>
            <p>Winning Numbers</p>
            <p>
              {WinningNumbers.length === 0 ? 'TBD' : WinningNumbers[0]}
              &nbsp; {WinningNumbers[1]}&nbsp; {WinningNumbers[2]}
              &nbsp; {WinningNumbers[3]}&nbsp; {WinningNumbers[4]}
              &nbsp; {WinningNumbers[5]}{' '}
            </p>
          </section>
          <section>
            <p>Your Result</p>
            {userResult()}
          </section>
         
          
        </div>
        <section id="charity-list">
           
            {lotteryData.WinningCharity.length === 0
              ? 'TBD'
              :  winningCharityResult(lotteryData={lotteryData})}
          </section>
      </section>
    );
  }
};

export default RDetail;



const winningCharityResult = ({lotteryData})=>{
  var arr = []  
  var totalVotes = 0
 lotteryData.CharityVoteCount.forEach((c)=> {
  totalVotes = totalVotes +c.votes;
  if(lotteryData.WinningCharity.find( (t)  =>  t.id ===c.charityId.id)){
      arr.push(c)
  }

} )


return (
  <div id="winner-charity">
   <div >
  {lotteryData.WinningCharity.length === 1 ? 'Winning Charity' : 'Winning Charities'}
  <div id="winner-charity-list">
  {arr.map((c)=>{
    return <p>{c.charityId.charityName}</p>
  })}
  </div>
   </div>
   <div id="winner-charity-vote">
     <pre>Votes Recieved</pre>
     <p>{arr[0].votes}</p>
   </div>
   <div id="winner-charity-per">
     <p> % Votes Recieved</p>
     <p>{(arr[0].votes/ totalVotes *100).toFixed(2)}</p>
   </div>
   </div>
);
}