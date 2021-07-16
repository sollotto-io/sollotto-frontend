import { IDrawingId } from "../../../api/types/lotteryData";
import compareArrs from "./compareArrs";

export default function checkIfWinner(
  lotteryData: IDrawingId,
  userWallet: number[]
): boolean {
  let result = false;
  lotteryData.WinnerWallet.forEach((val) => {
    if (!compareArrs(val, userWallet)) {
      result = false;
    } else if (compareArrs(val, userWallet)) {
      result = true;
    }
  });
  return result;
}
