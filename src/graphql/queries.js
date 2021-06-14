import gql from 'graphql-tag';


export const FETCH_ALL_CHARITIES = gql`
 {
  getAllCharities{
    id
    charityName
    projectDetails
    fundUse
    currentVotes
    addedBy
    lifeTimeVotes
    lifeTimeWins
    Status
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


export const FETCH_UPCOMING_DRAWING = gql`
 {
  getActiveDrawing{
    id
   	Charities{
      id
      charityName
     projectDetails
      fundUse
      currentVotes
      addedBy
      lifeTimeVotes
      lifeTimeWins
      Status
      Years
      watchURL
      watchGrade
      Impact
      webURL
    }
    StartDate
    EndDate
    
  }
}
`;

export const FETCH_ALL_LOTTERIES = gql`
  {
  getAllDrawing{
    id
    StartDate
    EndDate
    WinnerWallet
    isActive
    WinningCharity{
      id
      charityName
    }
    WinningNumbers
    TotalPoolValue
    
  }
}
`;

export const FETCH_LOTTERY_BY_ID = gql`
  query getDrawingById($Id: ID) {
  getDrawingById(id:$id){
    id
    WinningCharity{
      id
      charityName
    }
    Tickets{
      walletID
    }
    WinningNumbers
    EndDate
    WinnerWallet
    TotalPoolValue
  }
}
  
`;


