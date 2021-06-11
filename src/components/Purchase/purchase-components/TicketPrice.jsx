import React, { useContext } from 'react';
import { LotteryContext } from '../../../context/LotteryContext';

export default function TicketPrice() {
  const { lotteryData } = useContext(LotteryContext);
  return (
    <div className="ticketPrice">Ticket Price: {lotteryData.currentLottery.TicketPrice} SOL</div>
  );
}
