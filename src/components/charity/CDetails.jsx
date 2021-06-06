import React from 'react'
import SollotoGradient from "../common/sollotoGradient"

const CDetails = ({charityDetail}) => {

    return (
        <section id="poolC">
         <div id="charityHeader">   
        <h4> {charityDetail.charityName}</h4>
        <div>
            <SollotoGradient addedBy= {charityDetail.addedBy}/>
           
        </div>
       
        </div>
        <div id="other-details">
            <section>
                <p>Current Votes</p>
                <p>{charityDetail.currentVotes === null ? "-" : charityDetail.currentVotes}</p>   
            </section>
            <section>
            <p>Lifetime Votes</p>
                <p>{charityDetail.lifeTimeVotes === null ? "-" : charityDetail.lifeTimeVotes}</p> 
            </section>
            <section>
            <p>Lifetime Wins</p>
                <p>{charityDetail.lifeTimeWins === null ? "-" : charityDetail.lifeTimeWins}</p> 
            </section>
          
           
        </div>
        </section>
    )
}

export default CDetails;
