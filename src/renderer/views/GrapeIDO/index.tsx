
import IDOCard from "./components/IDOCard";
import Grape from "../../../assets/images/svg/grape_logo.svg"
import Parrot from "../../../assets/images/pictures/parrot (1).png"
import Sollotto from "../../../assets/images/pictures/sollotto.gif"
import "./index.scss"
function GrapeIDO(): JSX.Element {
  return (
    <div className="pageWrapperIDO">
      <div id="purchaseSection">
        <div className="pageHeaderIDO">
      <img src={Grape} height="50px" alt="" />
      <img src={Parrot} height="50px"  alt="" />
        </div>
      <p>Powered By <img src={Sollotto} height="30px" alt=""/> Sollotto</p>
        <IDOCard />
      </div>
    </div>
  );
}

export default GrapeIDO;
