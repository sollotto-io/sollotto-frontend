import gql from "graphql-tag";

export const FETCH_ACTIVE_CHARITIES = gql`
  {
    getActiveCharities {
      ID
      id
      charityName
    }
  }
`;
export const FETCH_ALL_CHARITIES = gql`
  {
    getAllCharities {
      id
      ID
      charityName
      projectDetails
      addedBy
      Status
      lifeTimeVotes
      lifeTimeWins
      currentVotes
      Years
      watchURL
      watchGrade
      Impact
      webURL
    }
  }
`;
export const FETCH_POOLS = gql`
  {
    getAllPools {
      id
      PoolName
      Pool
      PrizePool
      TimeRemaining
      PoolARP
      TotalDeposit
      TotalLiquidity
      Odds
      currentTicketPrice
    }
  }
`;

export const FETCH_TICKET = gql`
  {
    getDataWallets {
      DataWallet
    }
  }
`;

export const FETCH_UPCOMING_LOTTERY = gql`
  {
    getupcomingLottery {
      Id
      Charities
      TicketPrice
      StartDate
      EndDate
    }
  }
`;

export const FETCH_ALL_LOTTERIES = gql`
{
 getAllLotteries{
  Id
  Charities
  CharityVoteCount{
    charityId
votes
  }
  TicketPrice
  StartDate
  EndDate
  WinnerWallet
  TotalPoolValue
  TotalRegistrations
  isActive
  LotteryDataAccount
  WinningCharity
}
}

`

export const FETCH_LOTTERY_BY_ID = gql`
query getLotteryById($Id:Int){

  getLotteryById(Id:$Id){
    Id
    Charities
    CharityVoteCount{
      charityId
      votes
    }
    TicketPrice
    StartDate
    EndDate
    WinnerWallet
    TotalPoolValue
    WinningCharityName
    TotalRegistrations
    WinningCharity
    LotteryDataAccount
    WinningNumbers
    
  }

 

}
`

export const FETCH_USER_TICKET = gql`
query getUserTickets( $walletID:[Int!], $LotteryId:Int!){

  getUserTickets(walletID:$walletID,LotteryId:$LotteryId){
    walletID
    ticketArray
    DataWallet
    charityId
    LotteryId
  }
}

`