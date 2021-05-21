import gql from "graphql-tag";

export const FETCH_CHARITIES = gql`
  {
    getActiveCharities {
      id
      charityName
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


