import React, { useRef,useContext } from "react";
import CharityImage from "./CharityImage";
import CharityName from "./CharityName";
import CharitySelectButton from "./CharitySelectButton";
import SolLottoLogo from "./purchase-components/SolLottoLogo";
import {CharityDataContext} from "./CharitySelectorGrid";

const SingleCharitySelector = (props) => {
	
	const singleCharityBlockRef = useRef(null);

	const data = useContext(CharityDataContext);
	var charityBtnHandler = (charityBtn) => {
		props.charitySelectHandler(charityBtn, singleCharityBlockRef.current,props.charityId);
	};

	return (
		<div
			className='psuedoGreyBg psuedoBorder singleCharitySelectorWrapper'
			ref={singleCharityBlockRef}
		>
			<div className='singleCharitySelector'>
				<SolLottoLogo charitySelectorIcon={true} />
				<CharityImage charityId={data.getActiveCharities[props.index].ID}
					/>
				<CharityName charityIndex={props.index} />
				<CharitySelectButton
					charityName = {data.getActiveCharities[props.index].charityName}
					charityId={data.getActiveCharities[props.index].id}
					charityBtnHandler={charityBtnHandler}
					
				/>
			</div>
		</div>
	);
};
export default SingleCharitySelector;
