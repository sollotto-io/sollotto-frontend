
import IDOCard from "./components/IDOCard";
import Grape from "../../../assets/images/svg/grape_logo.svg"
import Parrot from "../../../assets/images/pictures/parrot (1).png"
import Sollotto from "../../../assets/images/pictures/sollotto.gif"
import "./index.scss"
import { Link } from "react-router-dom";
function GrapeIDO(): JSX.Element {
  return (
    <div className="pageWrapperIDO">
      <div id="purchaseSection">
        <div className="pageHeaderIDO">
      <img src={Grape} height="50px" alt="" />
      <img src={Parrot} height="50px"  alt="" />
        </div>
      <p>Powered By <img src={Sollotto} height="30px" alt=""/> SolLotto</p>
        <IDOCard />
        <span style={{opacity:0.7, marginTop:10, color:"gray"}}>
        Verify only one set of numbers has been chosen by visiting: <br /><Link style={{ marginTop:10, color:"gray"}} to={'/grape-parrot-verify'}target="_blank">app.sollotto.io/grape-parrot-verify</Link>
        </span>
      </div>
    </div>
  );
}

export default GrapeIDO;