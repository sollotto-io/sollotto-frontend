import React from 'react'


const CDetails = ({charityDetail}) => {

    return (
        <section id="poolC">
         <div id="charityHeader">   
        <h4> {charityDetail.charityName}</h4>
        <div>
            <p className=" gradientBorder" >
                {charityDetail.addedBy}</p>
            <p>{charityDetail.Status}</p>
        </div>
       
        </div>
        <div id="other-details">
            <section>
                <p>Current Votes</p>
                <p>{charityDetail.currentVotes === null ? "N/A" : charityDetail.currentVotes}</p>   
            </section>
            <section>
            <p>Lifetime Votes</p>
                <p>{charityDetail.lifeTimeVotes === null ? "N/A" : charityDetail.lifeTimeVotes}</p> 
            </section>
            <section>
            <p>Lifetime Wins</p>
                <p>{charityDetail.lifeTimeWins === null ? "N/A" : charityDetail.lifeTimeWins}</p> 
            </section>
            <section>
            <p>Total Contibution</p>
                <p>4000.222</p> 
            </section>
           
        </div>
        </section>
    )
}

export default CDetails;
