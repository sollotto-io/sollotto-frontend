import React from 'react'
import PageTitle from '../components/common/PageTitle'
import SortHeader from '../components/Pool/sortHeader'
import SortButtons from '../components/Pool/sortButtons'
import "../css/pool.css"

const Pool = () => {
    return (
        <div id="poolSection">
           
            <div id="poolHeader">
                <PageTitle title ="Pools"/>
                <input id="search-pool" type="text" name="name" placeholder="Search pools by name or ticker"/>
                </div>   
                <div className="wrapper">
                   <SortHeader/>
                   <SortButtons/>
                </div>
                <div className="pool-table">
            <p>pool table</p>
                </div>
                
        </div>
    )
}

export default Pool
