import { number } from "yargs";
import { Icharities } from "./globalData";

export interface IlotteryTicket {
  walletID: number[];
  ticketArray: number[];
}
export interface Ilottery {
  id: string;
  Charities: Icharities[];
  StartDate: string;
  EndDate: string;
  TotalPoolValue: number;
  Tickets: IlotteryTicket[];
}

type Refetch = () => Promise<void>;
export interface IlotteryData {
  loading: boolean;
  lotteryData: Ilottery[];
  refetch: Refetch | null;
}

export interface IDrawing {
  id: string;
  StartDate: string;
  EndDate: string;
  WinnerWallet: number[][];
  isActive: boolean;
  WinningCharity: {
    id: string;
    charityName: string;
  }[];
  WinningNumbers: number[];
  TotalPoolValue: number;
}

export interface IDrawingId {
  id: string;
  WinningCharity: {
    id: string;
    charityName: string;
  }[];
  Tickets: {
    walletID: string;
    ticketArray: number[];
    charityId: {
      charityName: string;
    };
    TransactionId:string
  }[];
  WinningNumbers: number[];
  EndDate: string;
  WinnerWallet: number[][];
  isActive: boolean;
  TotalPoolValue: number;
  CharityVoteCount: {
    charityId: {
      id: string;
      charityName: string;
    };
    votes: number;
  }[];
}
