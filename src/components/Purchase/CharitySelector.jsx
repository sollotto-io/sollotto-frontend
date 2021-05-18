import React from "react";
import CharitySelectorGrid from "./CharitySelectorGrid";
export default function CharitySelector({selectedCharity,setSelectedCharity}) {
	return (
		<div className='charitySelector'>
			<span>Vote For Your Charity Of Choice:</span>
			<CharitySelectorGrid selectedCharity={selectedCharity} setSelectedCharity={setSelectedCharity} />
		</div>
	);
}
