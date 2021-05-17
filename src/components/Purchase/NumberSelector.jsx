import React from "react";
import SingleNumberSelector from "./SingleNumberSelector";

export default function NumberSelector({ticketNumbers}) {
	return(
	<div className="numberSelector">
	{[1,2,3,4,5,6].map((numPos,index)=>{
		return (<SingleNumberSelector ticketPos ={el => ticketNumbers.current[index] = el} numPos={numPos} key={index}/>)
	})}
	</div>
	)
	// return (
	// 	<div className='numberSelector'>
	// 		<SingleNumberSelector numPos={0} />
	// 		<SingleNumberSelector numPos={1} />
	// 		<SingleNumberSelector numPos={2} />
	// 		<SingleNumberSelector numPos={3} />
	// 		<SingleNumberSelector numPos={4} />
	// 		<SingleNumberSelector numPos={5} /> 
	// 	</div>
	// );
}
