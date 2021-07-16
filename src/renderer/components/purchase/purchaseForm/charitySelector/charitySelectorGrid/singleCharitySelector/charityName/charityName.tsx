import "./index.scss";
import useReduxState from "../../../../../../../hooks/useReduxState";

export default function CharityName({
  charityIndex,
}: {
  charityIndex: string | number;
}): JSX.Element {
  const [lotteryState] = useReduxState((state) => state.lotteryData);

  const { lotteryData } = lotteryState;

  return (
    <div className="charityName">
      {lotteryData.Charities[charityIndex].charityName}
    </div>
  );
}
