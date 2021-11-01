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
  }
`;
export const FETCH_LAUNCHES = gql`
  {
    getAllLaunched {
      id
      tokenName
      tokenLogo
      totalWinners
      dueDate
      endDate
      frequency
      maxDeposit
      status
      tokenAddress
      passLaunches {
        winnersWalletsId
        finishDate
      }
    }
  }
`;
export const FETCH_ALL_POOLS = gql`
  {
    getAllPools {
      dueDate
      endDate
      tokenAddress
      tokenName
      tokenLogo
      id
      status
      frequency
      passPools {
        winningWalletId
        finishDate
      }
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

export const GET_ALL_ADMIN_USERS = gql`
  {
    getAllUsers {
      admin
      username
      id
    }
  }
`;

export const GET_TICKET_COUNT_BY_USER = gql`
  query getTicketsByUserCount($walletId: [Int]!) {
    getTicketsByUserCount(walletId: $walletId)
  }
`;
export const GET_TICKET_COUNT = gql`
  {
    getTicketsCount
  }
`;

export const FETCH_MODEL_4 = gql`
  {
    getModel4 {
      endDate
      passModel4 {
        winningWalletId
        finishDate
      }
    }
  }
`;
export const FETCH_ALL_NFT_LOTTERIES = gql`
  {
    getAllNfts {
      id
      prizes {
        image
        collectionName
        address
        name
      }
      endDate
      ticketPrice
      status
      tickets {
        walletId
        dataAccountId
        transactionId
      }
    }
  }
`;

export const FETCH_ACTIVE_NFT_LOTTERY = gql`
  {
    getActiveNft {
      id
      prizes {
        image
        collectionName
        address
        name
      }
      endDate
      ticketPrice
      status
      tickets {
        walletId
        dataAccountId
        transactionId
      }
    }
  }
`;
