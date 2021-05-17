import React from "react";

function Card(WrappedComponent) {
	return function (props) {
		return (
			<div className='card'>
				<WrappedComponent />
			</div>
		);
	};
}

export default Card;
