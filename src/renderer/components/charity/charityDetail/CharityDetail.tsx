import "./index.scss";
import { useParams } from "react-router";
import Loader from "../../common/loader/Loader";
import CharityDetailContent from "./charityDetailContent/CharityDetailContent";
import CharityCommunitySelect from "./charityCommunitySelect/CharityComunitySelect";
import { useHistory } from "react-router";
import CharityIntro from "./charityIntro/CharityIntro";
import CharityExtraInfo from "./charityExtraInfo/CharityExtraInfo";
import useReduxState from "../../../hooks/useReduxState";
import { ICharity } from "../../../api/types/globalData";

const CharityDetail = (): JSX.Element => {
  const history = useHistory();
  const sendToCharity = () => {
    history.push(`/charities`);
  };

  const [{ charities }] = useReduxState((state) => state.globalData.charities);
  const { id }: { id: string } = useParams();
  const charityDetail = charities.find((p: ICharity) => p.charityName === id);

  if (charityDetail) {
    return (
      <>
        <div className="detailSection">
          <div className="topSection">
            <CharityDetailContent charityDetail={charityDetail} />
            <CharityCommunitySelect charityDetail={charityDetail} />
          </div>
          <div className="bottomSection">
            <CharityIntro charityDetail={charityDetail} />
            <CharityExtraInfo charityDetail={charityDetail} />
          </div>
        </div>
      </>
    );
  } else if (charityDetail === undefined) {
    sendToCharity();
    return <></>;
  } else {
    return <Loader />;
  }
};
export default CharityDetail;
