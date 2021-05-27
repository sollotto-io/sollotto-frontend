import React from "react";
const CharityIntro = ({charityDetail}) => {
  return (
    <div className="charityIntroSection">
      <div>
        <h4>Project Details</h4>
      </div>
      <div id="project-buttons">
          <button>WEBSITE</button>
          <button>SOLANA EXPLORER</button>
      </div>
        <div id="project-desc">
           <p>{charityDetail}</p>
        </div>
    </div>
  );
};

export default CharityIntro;
