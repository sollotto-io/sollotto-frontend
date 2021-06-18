import { createContext } from 'react';
import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { FETCH_UPCOMING_DRAWING } from '../graphql/queries';

export const LotteryContext = createContext(null);

const LotteryContextWrapper = ({children}) => {
    const { loading, data, refetch } = useQuery(FETCH_UPCOMING_DRAWING);
    return (
<LotteryContext.Provider value={{refetch,lotteryData:data ? data.getActiveDrawing : [] ,loading}} >
{children}

</LotteryContext.Provider>)
}

export default LotteryContextWrapper
