import React from 'react'
import winningTrophy from "../../images/pictures/trophy.png"
import runnerUp from "../../images/pictures/medal.png"
const WinningSection = ({poolDetail}) => {
    return (
        <div className="prizePoolSection">
            <div>
           <h4>{poolDetail.Pool} Price Pool #1</h4>
           </div>
           <div id="winner-amount">
               <div id="trophy-image">
                   <p>&nbsp;&nbsp;&nbsp;&nbsp;Winner</p>
                  <img src={winningTrophy} width={75} height={100} alt="trophy"  />
               </div>
               <div id="amount">
                   <h4>{poolDetail.PrizePool * 0.85} {poolDetail.Pool}</h4>
               </div>
           </div>
           {/* <div id="winner-amount">
           <div id="trophy-image">
                   <p> &nbsp;&nbsp;Runner Up</p>
                  <img src={runnerUp} width={75} height={100} alt="runner Up"  />
               </div>
               <div id="amount">
                   <h4>{poolDetail.PrizePool * 0.15} {poolDetail.Pool}</h4>
               </div>

           </div> */}


        </div>
    )
}

export default WinningSection
