import gql from 'graphql-tag';

export const FETCH_ALL_CHARITIES = gql`
  {
    getAllCharities {
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
      URL
      Grade
      isWatch
      Impact
      webURL
      socialMedia
    }
  }
`;
// export const FETCH_POOLS = gql`
//   {
//     getAllPools {
//       id
//       PoolName
//       Pool
//       PrizePool
//       TimeRemaining
//       PoolARP
//       TotalDeposit
//       TotalLiquidity
//       Odds
//       currentTicketPrice
//     }
//   }
// `;

export const FETCH_UPCOMING_DRAWING = gql`
  {
    getActiveDrawing {
      id
      Charities {
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
        URL
        Grade
        isWatch
        Impact
        webURL
      }
      StartDate
      EndDate
      TotalPoolValue
      Tickets {
        walletID
        ticketArray
      }
    }
  }
`;

export const FETCH_ALL_LOTTERIES = gql`
  {
    getAllDrawing {
      id
      StartDate
      EndDate
      WinnerWallet
      isActive
      WinningCharity {
        id
        charityName
      }
      WinningNumbers
      TotalPoolValue
    }
  }
`;

export const FETCH_LOTTERY_BY_ID = gql`
  query getDrawingById($id: ID) {
    getDrawingById(id: $id) {
      id
      WinningCharity {
        id
        charityName
      }
      Tickets {
        walletID
        ticketArray
        charityId {
          charityName
        }
      }
      WinningNumbers
      EndDate
      WinnerWallet
      TotalPoolValue
      isActive
      CharityVoteCount{
      charityId{
        id
        charityName
      }
      votes
    }
    }
  }
`;
