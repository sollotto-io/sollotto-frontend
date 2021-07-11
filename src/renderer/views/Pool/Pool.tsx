import "./index.scss";
import ComingSoon from "../../../assets/images/pictures/coming-soon.png";

const Pool = (): JSX.Element => (
  <div className="pageWrapper">
    <div id="poolSection">
      <img src={ComingSoon} alt="logo" className="comingSoon" />
    </div>
  </div>
);

export default Pool;
