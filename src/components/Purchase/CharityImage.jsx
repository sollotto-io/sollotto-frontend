import React from "react";
export default function CharityImage({charityId}) {
	console.log(charityId)
	function importAll(r) {
		return r.keys().map(r);
	  }
	  
	  const images = importAll(require.context('../../images/pictures/', false, /\.(png)$/));
	  console.log(images[charityId].default)
	 return <img src={images[charityId-1].default} alt='charity' className='charityImg' />;
}
