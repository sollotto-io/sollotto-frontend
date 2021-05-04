import React from "react";

function Card(WrappedComponenet) {
	return function (props) {
		return (
			<div class='card'>
				<WrappedComponenet />
			</div>
		);
	};
}

export default Card;
