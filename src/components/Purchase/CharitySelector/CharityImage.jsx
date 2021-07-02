import React from 'react';
export default function CharityImage({ charityId }) {
  

  return (
    <img src={`https://dev-rushi.netlify.app/images/pictures/${charityId}.png`} height={150} alt="charity" className="charityImg" />
      );
}
