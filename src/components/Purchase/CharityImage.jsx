import React from "react";
export default function CharityImage({charityId}) {
	function importAll(r) {
		return r.keys().map(r);
	  }
	  
	  const images = importAll(require.context('../../images/pictures/', false, /\.(png)$/));
	 return <img src={images[charityId-1].default} height={150} alt='charity' className='charityImg' />;
}
