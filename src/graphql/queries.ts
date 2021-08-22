import { gql } from "@apollo/react-hooks";

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
      publicKey
      lifeTimeNominationVotes
      nominationVotes
      ImageURL
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
        ImageURL
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
        publicKey
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

/* watchURL
      watchGrade */

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
        TransactionId
      }
      WinningNumbers
      EndDate
      WinnerWallet
      TotalPoolValue
      isActive
      CharityVoteCount {
        charityId {
          id
          charityName
        }
        votes
      }
    }
  }
`;

export const FETCH_SINGLE_USER = gql`
  query getSingleUser($UserPK: String) {
    getSingleUser(UserPK: $UserPK) {
      id
      TokenValue
      UserPK
    }
  }
`;

export const FETCH_RAFFLES = gql`
  {
    getAllRaffle {
      id
      raffleName
      urlSlug
      raffleImage
      sollotoBranding
      testingWA
      liveWA
      operatorWa
      vanityUrl
      raffleStatus
      Status
    }
    getAllLaunched{
    id
    PoolName
    PoolImage
    TimeRemaining
    MaxDeposit
    TotalWinners
    Status
  }
  }
`;

export const FETCH_ALL_POOLS = gql`
  {
    getAllPools {
      dueDate
      tokenAddress
      tokenName
      tokenLogo
      id
      status
    }
  }
`;

export const FETCH_LOTTERY_DATA_ACCOUNT = gql`
  {
  getLotteryInfo {
    LotteryDataAccount
    LotteryId
  }
  }
`;
