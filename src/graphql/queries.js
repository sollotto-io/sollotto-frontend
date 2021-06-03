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
  getAllCharities{
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
    getAllPools{
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


