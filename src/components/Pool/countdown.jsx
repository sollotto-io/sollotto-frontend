import React from "react";
import moment from "moment";
import Countdown from "react-countdown";


const renderer =({days, hours, minutes, seconds, completed}) =>{
  if(completed){
    return <span id="count">lottery is closed</span>; 
  }else{
    return <span id="count" >{days} d  {hours} hrs  {minutes} mins  {seconds} sec </span>;  }
}
const Counter = ({message, time }) => {
  return (
    <div>
      <Countdown className="timer" date={moment(time).format()}
      renderer={renderer} />
    </div>
  );
};

export default Counter;
