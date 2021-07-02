import React from 'react';

const TimeRemaining = ({charityDetail}) => {
  
  return (
    <div id="charitySelection" className=" wrap gradientBg">
      <div id="charitySelect">
    <img src={`https://dev-rushi.netlify.app/images/pictures/${charityDetail.charityName}.png`} height={150}  alt="charity" className="charityImg-detail" />
        <h4 style={{margin:0,marginTop:10}}>{charityDetail.charityName}</h4>
      </div>
    </div>
  );
};

export default TimeRemaining;
