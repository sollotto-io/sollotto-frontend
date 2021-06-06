import moment from 'moment'
import React from 'react'

const RDetail = ({globalData,data}) => {
    console.log(globalData)
    console.log(data)
    if(data){
        return (
            <section id="poolC">
            <div id="charityHeader">   
           <h4>Pick 6</h4>
           <div>
                <h4>{moment(data.EndDate).format('LL')}</h4>
           </div>
          
           </div>
           <div id="other-details">
               <section>
                   <p>Prize Pool</p>
                    <p>{data.TotalPoolValue.toFixed(2)}</p> 
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
               <section>
               <p>Winning Charities</p>
                  {data.WinningCharity.map((c,i)=>{
                      var cha = globalData.charities.find((t)=>(t.ID ===c))
                      console.log(cha)
                       return <p key={i}>{cha.charityName}</p>
                  })}
               </section>
              
              
           </div>
           </section>
       
        )
    }
   
}

export default RDetail
