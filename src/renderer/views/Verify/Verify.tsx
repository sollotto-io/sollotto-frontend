import "./index.scss";
import PrizePoolKeys from "../../components/verify/prizePoolKeys/PrizePoolKeys";
import CharitiesKeys from "../../components/verify/charitiesKeys/CharitiesKeys";
import SollotoLogo from "../../../assets/images/logos/Sollotto-Icon-Transparent.png";
import PageTitle from "../../components/common/pageTitle/PageTitle";
export default function Verify(): JSX.Element {
  return (
    <div className="verify">
      <PrizePoolKeys />
      <PageTitle title="Verify" />
      <div className="sollotto-logo">
        <img src={SollotoLogo} />
      </div>
      <CharitiesKeys />
    </div>
  );
}
