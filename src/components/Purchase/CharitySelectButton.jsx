import React, { useRef, useEffect } from "react";

const CharitySelect = (props) => {
	const btnRef = useRef(null);
	useEffect(() => {
		props.selectBtnRefArr.push(btnRef.current);
	});
	return (
		<div className='gradientBg charitySelectBtnWrapper gradientBorder'>
			<button
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
