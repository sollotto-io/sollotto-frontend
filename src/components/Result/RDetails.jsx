import moment from 'moment'
import React from 'react'

const RDetail = ({data}) => {
    console.log(data)
    return (
        <section id="poolC">
        <div id="charityHeader">   
       <h4>Pick 6</h4>
       <div>
            <h4>{moment(data.EndDate).format('L')}</h4>
       </div>
      
       </div>
       <div id="other-details">
           <section>
               <p>Prize Pool</p>
                <p>{data.TotalPoolValue}</p> 
           </section>
           <section>
           <p>Total Winners</p>
           <p>{data.WinnerWallet.length}</p> 
              
           </section>
           <section>
           <p>Winner Numbers</p>
           <p>{data.WinningNumbers[0]}&nbsp; {data.WinningNumbers[1]}&nbsp; {data.WinningNumbers[2]}&nbsp; {data.WinningNumbers[3]}&nbsp; {data.WinningNumbers[4]}&nbsp; {data.WinningNumbers[5]} </p> 
              
           </section>
           <section>
           <p>Your Result</p>
               <p>No Winner</p> 
           </section>
          
       </div>
       </section>
   
    )
}

export default RDetail
