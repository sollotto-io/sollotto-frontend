import React from "react";

export default function HamBtn(props) {
	return (
		<div onClick={props.onMenuClick} className='hamBtn'>
			<div className='bar1'></div>
			<div className='bar2'></div>
			<div className='bar3'></div>
		</div>
	);
}
