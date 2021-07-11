import "./index.scss";
import SingleCharitySelector from "./singleCharitySelector/SingleCharitySelector";
import reduxAction from "../../../../../redux/reduxAction";
import useReduxState from "../../../../../hooks/useReduxState";
import { ICharity } from "../../../../../api/types/globalData";

import Loader from "../../../../common/loader/Loader";

export default function CharitySelectorGrid(): JSX.Element {
  const [lotteryState] = useReduxState((state) => state.lotteryData);

  const { lotteryData, loading } = lotteryState;

  //------------border and button styling while selected--------------------

  const charitySelectHandler = async (charityIndex: string) => {
    if (charityIndex)
      reduxAction({
        type: "SET_PURCHASE_DATA",
        arg: { selectedCharity: charityIndex },
      });
  };
  if (loading === true) {
    return <Loader />;
  } else if (lotteryData === null) {
    return <></>;
  } else {
    return (
      <div className="charitySelectorGrid">
        {lotteryData.Charities.map((charity: ICharity, index: number) => {
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
