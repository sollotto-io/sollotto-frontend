import compareArrs from './compareArrs';

export default function checkIfWinner(lotteryData, userWallet) {
  let result = null;
  lotteryData.WinnerWallet.forEach((val) => {
    if (!compareArrs(val, userWallet)) {
      result = false;
    } else if (compareArrs(val, userWallet)) {
      result = true;
    }
  });
  return result;
}
