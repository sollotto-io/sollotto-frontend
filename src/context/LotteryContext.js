import { createContext } from 'react';

export const LotteryContext = createContext(null);

const LotteryContextWrapper = ({children}) => {
    return (

{children}
    )}



export default LotteryContextWrapper
