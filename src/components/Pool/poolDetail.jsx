import React from 'react'
import { useParams } from 'react-router'

const PoolDetail = () => {
    const {id} = useParams()
    console.log(id);
    return (
        <div>
           <p>{id}</p> 
        </div>
    )
}

export default PoolDetail
