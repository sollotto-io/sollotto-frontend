import React from "react";
import CharityImage from "./CharityImage";
import CharityName from "./CharityName";
import CharitySelect from "./CharitySelect";

export default function SingleCharitySelector(props) {
	return (
		<div className='gradientBg gradientBorder singleCharitySelectorWrapper'>
			<div className='singleCharitySelector'>
				<CharityImage />
				<CharityName name={props.name} />
				<CharitySelect />
			</div>
		</div>
	);
}
