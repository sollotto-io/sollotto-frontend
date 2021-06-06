import React from "react";
const CharityIntro = ({charityDetail}) => {
  console.log(charityDetail.webURL)
  return (
    <div className="charityIntroSection">
      <div>
        <h4>Project Details</h4>
      </div>
      <div id="project-buttons">
          <a href={charityDetail.webURL} target="_blank"  rel="noreferrer" ><button>WEBSITE</button></a>
         
      </div>
        <div id="project-desc">
           <p>{charityDetail.projectDetails}</p>
        </div>
    </div>
  );
};

export default CharityIntro;
