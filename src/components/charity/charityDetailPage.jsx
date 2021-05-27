import React, { useContext } from "react";
import { useParams } from "react-router";
import { GlobalContext } from "../../context/GlobalContext";
import Loader from "../common/Loader";
import CDetail from "./CDetails";
import CharityCommunitySelect from "../Charity/CharityCommunitySelect";
import { useHistory } from "react-router";

const CharitDetailPage = () => {
  const history = useHistory();
  const sendToCharity = () => {
    history.push(`/charities`);
  };
  const { globalData } = useContext(GlobalContext);
  const { id } = useParams();
  const charityDetail = globalData.charities.find((p) => p.charityName === id);

  if (charityDetail) {
    return (
      <div className="detailSection">
        <div className="topSection">
          <CDetail charityDetail={charityDetail} />
          <CharityCommunitySelect />
        </div>
      </div>
    );
  } else if (charityDetail === undefined) {
    sendToCharity();
    return null;
  } else {
    return <Loader />;
  }
};
export default CharitDetailPage;
