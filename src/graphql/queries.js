import gql from "graphql-tag";

export const FETCH_ACTIVE_CHARITIES = gql`
  {
    getActiveCharities {
      id
      charityName
    }
  }
`;
export const FETCH_ALL_CHARITIES = gql`
 {
  getAllCharities{
    id
    charityName
    projectDetails
    addedBy
    Status
    lifeTimeVotes
    lifeTimeWins
    currentVotes
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


