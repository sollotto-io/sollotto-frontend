import React from "react";

function Card(WrappedComponenet) {
	return function (props) {
		return (
			<div className='card'>
				<WrappedComponenet />
			</div>
		);
	};
}

export default Card;
