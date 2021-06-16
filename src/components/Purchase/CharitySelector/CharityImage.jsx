import React from 'react';
export default function CharityImage({ charityId }) {
 

  return (
    <img src={`http://localhost:3000/images/pictures/${charityId}.png`} height={150} alt="charity" className="charityImg" />
      );
}
