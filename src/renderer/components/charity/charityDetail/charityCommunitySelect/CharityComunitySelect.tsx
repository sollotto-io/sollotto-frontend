import "./index.scss";
import { ICharity } from "../../../../api/types/globalData";

const TimeRemaining = ({
  charityDetail,
}: {
  charityDetail: ICharity;
}): JSX.Element => {
  return (
    <div id="charitySelection" className=" wrap gradientBg">
      <div id="charitySelect">
        <img
          src={`https://app.sollotto.io/images/pictures/${charityDetail.charityName}.png`}
          height={150}
          alt="charity"
          className="charityImg-detail"
        />
        <h4 style={{ margin: 0, marginTop: 10 }}>
          {charityDetail.charityName}
        </h4>
      </div>
    </div>
  );
};

export default TimeRemaining;
