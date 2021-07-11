import "./index.scss";
import TwitterIcon from "@material-ui/icons/Twitter";
import { IconButton } from "@material-ui/core";
import { ICharity } from "../../../../api/types/globalData";

const CharityIntro = ({
  charityDetail,
}: {
  charityDetail: ICharity;
}): JSX.Element => {
  const TwitterLink = () => {
    window.open(`${charityDetail.socialMedia}`, "_blank");
  };
  return (
    <div className="charityIntroSection">
      <div>
        <h4>Project Details</h4>
      </div>
      <div id="project-buttons">
        <a
          href={charityDetail.webURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button style={{ cursor: "pointer" }}>WEBSITE</button>
        </a>
        <IconButton onClick={TwitterLink}>
          <TwitterIcon fontSize="small" />
        </IconButton>
      </div>
      <div id="project-desc">
        <b>Mission:</b> <p>{charityDetail.projectDetails}</p>
        <br />
        <b>Use of funds:</b> <p>{charityDetail.fundUse}</p>
      </div>
    </div>
  );
};

export default CharityIntro;
