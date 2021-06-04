import React, { useRef } from "react";

const CharitySelect = (props) => {
	const btnRef = useRef(null);
	
	
	return (
		<div className='gradientBg charitySelectBtnWrapper gradientBorder'>
			<button
				value={props.charityName}
				type='button'
				className='charitySelectBtn globalBtn'
				onClick={() => {
					props.charityBtnHandler(btnRef.current);
				}}
				ref={btnRef}
			>
				SELECT
			</button>
		</div>
	);
};

export default CharitySelect;
