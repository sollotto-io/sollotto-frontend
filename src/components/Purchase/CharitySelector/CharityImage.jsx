import React from 'react';
export default function CharityImage({ charityId }) {
  

  return (
    <img src={`http://app.sollotto.io/images/pictures/${charityId}.png`} height={150} alt="charity" className="charityImg" />
      );
}
