import "./index.scss";
import { ICharity } from "../../../../api/types/globalData";
const CharityExtraInfo = ({
  charityDetail,
}: {
  charityDetail: ICharity;
}): JSX.Element => {
  return (
    <div className="charityExtraInfo">
      <div id="infoHeader">
        <p>Charity Details</p>
      </div>
      <section id="other-info">
        <div id="info">Years Operating : {charityDetail.Years}</div>
        <div id="info">
          <a
            style={{ color: "var(--purple-dino)" }}
            rel="noopener noreferrer"
            target="_blank"
            href={charityDetail.URL}
          >
            {charityDetail.isWatch ? "Charity Watch Link" : "Givewell Link"}
          </a>
        </div>
        <div id="info">
          {charityDetail.isWatch ? "Charity Watch Grade" : "Givewell Grade"} :{" "}
          {charityDetail.Grade}
        </div>

        <div id="info">Impact Area : {charityDetail.Impact}</div>
        <div id="info">Added By : {charityDetail.addedBy}</div>
      </section>
    </div>
  );
};

export default CharityExtraInfo;
