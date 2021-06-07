import React, { useContext } from 'react'
import {GlobalContext} from "../../context/GlobalContext"
const SortButtonsCharity = () => {
    const {globalData} = useContext(GlobalContext)
    (globalData)
    return (
        <div id="sort-buttons">
            <button>ALL</button>
            <button>NEW</button>
            <button>OUR PICKS</button>
        </div>
    )
}

export default SortButtonsCharity
