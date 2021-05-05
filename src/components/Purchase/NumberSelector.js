import React from "react";
import SingleNumberSelector from "./SingleNumberSelector";

export default function NumberSelector() {
	return (
		<div className='numberSelector'>
			<SingleNumberSelector numPos={1} />
			<SingleNumberSelector numPos={2} />
			<SingleNumberSelector numPos={3} />
			<SingleNumberSelector numPos={4} />
			<SingleNumberSelector numPos={5} />
			<SingleNumberSelector numPos={6} />
		</div>
	);
}
