import React, { useRef, useEffect } from "react";

const CharitySelect = (props) => {
	const btnRef = useRef(null);
	
	useEffect(() => {
		let arr = props.selectBtnRefArr;
		console.log(props.selectBtnRefArr);
		arr.push(btnRef.current);
		props.setSelectBtnRefArr(arr);
	},[props.selectBtnRefArr]);
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
