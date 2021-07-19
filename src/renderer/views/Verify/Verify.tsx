import "./index.scss";
import PrizePoolKeys from "../../components/verify/prizePoolKeys/PrizePoolKeys";
import CharitiesKeys from "../../components/verify/charitiesKeys/CharitiesKeys";
import SolScanLink from "../../components/verify/solScanLink/SolScanLink";
import SollotoLogo from "../../../assets/images/logos/Sollotto-Icon-Transparent.png";
import PageTitle from "../../components/common/pageTitle/PageTitle";
import { useMediaQuery } from "react-responsive";

export default function Verify(): JSX.Element {
  const isMobile = useMediaQuery({
    query: "(max-width: 576px) ",
  });
  return (
    <div className="verify">
      <PrizePoolKeys />
      <PageTitle title="Verify" />
      <div className="sollotto-logo">
        <img src={SollotoLogo} />
        {!isMobile && <h3>Sollotto</h3>}
      </div>
      <CharitiesKeys />
      <SolScanLink />
    </div>
  );
}
