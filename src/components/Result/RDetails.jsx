import React from 'react'

const RDetail = ({id}) => {
    return (
        <section id="poolC">
        <div id="charityHeader">   
       <h4> {id}</h4>
       <div>
            <h4>Wednesday May 26</h4>
       </div>
      
       </div>
       <div id="other-details">
           <section>
               <p>Prize Pool</p>
                <p>36 SOLS</p> 
           </section>
           <section>
           <p>Total Winners</p>
           <p>1 Winner</p> 
              
           </section>
           <section>
           <p>Winner Numbers</p>
           <p>36  42  11  23  54    11</p> 
              
           </section>
           <section>
           <p>Your Result</p>
               <p>Winner</p> 
           </section>
          
       </div>
       </section>
   
    )
}

export default RDetail
