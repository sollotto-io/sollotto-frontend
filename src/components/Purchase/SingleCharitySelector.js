import React, { useRef } from "react";
import CharityImage from "./CharityImage";
import CharityName from "./CharityName";
import CharitySelectButton from "./CharitySelectButton";
import SolLottoLogo from "./purchase-components/SolLottoLogo";
const SingleCharitySelector = (props) => {
	const singleCharityRef = useRef(null);
	var charityBtnHandler = (charityBtn) => {
		props.charitySelectHandler(charityBtn, singleCharityRef.current);
	};
	return (
		<div
			className='psuedoGreyBg psuedoBorder singleCharitySelectorWrapper'
			ref={singleCharityRef}
		>
			<div className='singleCharitySelector'>
				<SolLottoLogo charitySelectorIcon={true} />
				<CharityImage />
				<CharityName charityIndex={props.charityIndex} />
				<CharitySelectButton
					charityId={props.charityId}
					charityBtnHandler={charityBtnHandler}
					selectBtnRefArr={props.selectBtnRefArr}
					singleCharityRef={singleCharityRef.current}
				/>
			</div>
		</div>
	);
};
export default SingleCharitySelector;
