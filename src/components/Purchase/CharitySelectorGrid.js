import React from "react";
import SingleCharitySelector from "./SingleCharitySelector";
export default function CharitySelectorGrid() {
	return (
		<div className='charitySelectorGrid'>
			<SingleCharitySelector name='All Hands and Hearts' />
			<SingleCharitySelector name='International Medical Corps' />
			<SingleCharitySelector name='Opportunity International' />
			<SingleCharitySelector name='UNICEF' />
		</div>
	);
}
