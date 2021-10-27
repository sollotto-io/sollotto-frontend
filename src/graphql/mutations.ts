import { gql } from "@apollo/react-hooks";

export const POST_TICKET = gql`
  mutation addTicket(
    $walletID: [Int]
    $ticketArray: [Int]
    $DataWallet: [Int]
    $charityId: String!
    $drawingId: String!
    $TransactionId: String!
    $UserPK: String!
  ) {
    addTicket(
      walletID: $walletID
      ticketArray: $ticketArray
      DataWallet: $DataWallet
      charityId: $charityId
      drawingId: $drawingId
      TransactionId: $TransactionId
      UserPK: $UserPK
    )
  }
`;

export const POST_USER_VOTES = gql`
  mutation addNominationVotes($charityId: ID!, $UserPk: String!, $Votes: Int!) {
    addNominationVotes(charityId: $charityId, UserPk: $UserPk, Votes: $Votes)
  }
`;
export const CHARITY_STATUS_CHAGED = gql`
  mutation deleteCharity($charityId: ID!, $Status: Boolean!) {
    deleteCharity(charityId: $charityId, Status: $Status)
  }
`;

export const UPDATE_CHARITY = gql`
  mutation updateCharity(
    $charityId: ID!
    $charityName: String
    $projectDetails: String
    $ImageURL: String
    $fundUse: String
    $addedBy: String
    $Status: Boolean
    $Years: String
    $isWatch: Boolean
    $URL: String
    $Grade: String
    $Impact: String
    $webURL: String
    $socialMedia: String
    $publicKey: String
  ) {
    updateCharity(
      charityId: $charityId
      charityInput: {
        charityName: $charityName
        projectDetails: $projectDetails
        ImageURL: $ImageURL
        fundUse: $fundUse
        addedBy: $addedBy
        Status: $Status
        Years: $Years
        isWatch: $isWatch
        URL: $URL
        Grade: $Grade
        Impact: $Impact
        webURL: $webURL
        socialMedia: $socialMedia
        publicKey: $publicKey
      }
    )
  }
`;
export const ADD_CHARITY = gql`
  mutation addCharity(
    $charityName: String
    $projectDetails: String
    $ImageURL: String
    $fundUse: String
    $addedBy: String
    $Status: Boolean
    $Years: String
    $isWatch: Boolean
    $URL: String
    $Grade: String
    $Impact: String
    $webURL: String
    $socialMedia: String
    $publicKey: String
  ) {
    addCharity(
      charityInput: {
        charityName: $charityName
        projectDetails: $projectDetails
        ImageURL: $ImageURL
        fundUse: $fundUse
        addedBy: $addedBy
        Status: $Status
        Years: $Years
        isWatch: $isWatch
        URL: $URL
        Grade: $Grade
        Impact: $Impact
        webURL: $webURL
        socialMedia: $socialMedia
        publicKey: $publicKey
      }
    )
  }
`;

export const ADD_RAFFLE = gql`
  mutation addRaffle(
    $raffleName: String!
    $urlSlug: String!
    $raffleImage: String!
    $sollotoBranding: Boolean!
    $testingWA: String!
    $liveWA: String!
    $operatorWa: String!
    $vanityUrl: String!
    $raffleStatus: String!
  ) {
    addRaffle(
      raffleInput: {
        raffleName: $raffleName
        urlSlug: $urlSlug
        raffleImage: $raffleImage
        sollotoBranding: $sollotoBranding
        testingWA: $testingWA
        liveWA: $liveWA
        operatorWa: $operatorWa
        vanityUrl: $vanityUrl
        raffleStatus: $raffleStatus
      }
    )
  }
`;

export const EDIT_RAFFLE = gql`
  mutation editRaffle(
    $raffleId: ID!
    $raffleName: String!
    $urlSlug: String!
    $raffleImage: String!
    $sollotoBranding: Boolean!
    $testingWA: String!
    $liveWA: String!
    $operatorWa: String!
    $vanityUrl: String!
    $raffleStatus: String!
  ) {
    editRaffle(
      raffleId: $raffleId
      raffleInput: {
        raffleName: $raffleName
        urlSlug: $urlSlug
        raffleImage: $raffleImage
        sollotoBranding: $sollotoBranding
        testingWA: $testingWA
        liveWA: $liveWA
        operatorWa: $operatorWa
        vanityUrl: $vanityUrl
        raffleStatus: $raffleStatus
      }
    )
  }
`;

export const CHANGE_RAFFLE_STATUS = gql`
  mutation changeRaffleStatus($raffleId: ID!, $Status: Boolean) {
    changeRaffleStatus(raffleId: $raffleId, Status: $Status)
  }
`;

export const ADD_POOL = gql`
  mutation addPool(
    $tokenName: String!
    $tokenLogo: String!
    $dueDate: String!
    $tokenAddress: String!
    $frequency: Int!
  ) {
    addPool(
      poolInput: {
        tokenName: $tokenName
        tokenLogo: $tokenLogo
        dueDate: $dueDate
        tokenAddress: $tokenAddress
        frequency: $frequency
      }
    ) {
      id
      tokenAddress
      tokenLogo
      tokenName
      dueDate
      endDate
      status
      frequency
    }
  }
`;

export const UPDATE_POOL = gql`
  mutation editPool(
    $id: ID!
    $tokenName: String!
    $tokenLogo: String!
    $dueDate: String!
    $tokenAddress: String!
    $frequency: Int!
  ) {
    updatePool(
      poolId: $id
      poolInput: {
        tokenName: $tokenName
        tokenLogo: $tokenLogo
        dueDate: $dueDate
        tokenAddress: $tokenAddress
        frequency: $frequency
      }
    ) {
      id
      tokenAddress
      tokenLogo
      tokenName
      dueDate
      endDate
      status
      frequency
    }
  }
`;

export const UPDATE_POOL_STATUS = gql`
  mutation editPool($id: ID!, $status: Boolean) {
    changePoolStatus(poolId: $id, status: $status) {
      id
      tokenAddress
      tokenLogo
      tokenName
      dueDate
      endDate
      status
      frequency
    }
  }
`;

export const ADD_LAUNCHPAD = gql`
  mutation AddLaunchPad(
    $tokenName: String!
    $tokenLogo: String!
    $totalWinners: Int!
    $dueDate: String!
    $maxDeposit: Int!
    $frequency: Int!
    $tokenAddress: String!
  ) {
    AddLaunchPad(
      LaunchPadInput: {
        tokenName: $tokenName
        tokenLogo: $tokenLogo
        totalWinners: $totalWinners
        dueDate: $dueDate
        maxDeposit: $maxDeposit
        frequency: $frequency
        tokenAddress: $tokenAddress
      }
    ) {
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
export const EDIT_LAUNCH = gql`
  mutation AddLaunchPad(
    $Id: ID!
    $tokenName: String!
    $tokenLogo: String!
    $totalWinners: Int!
    $dueDate: String!
    $maxDeposit: Int!
    $frequency: Int!
    $tokenAddress: String!
  ) {
    EditLaunchPad(
      Id: $Id
      LaunchPadInput: {
        tokenName: $tokenName
        tokenLogo: $tokenLogo
        totalWinners: $totalWinners
        dueDate: $dueDate
        maxDeposit: $maxDeposit
        frequency: $frequency
        tokenAddress: $tokenAddress
      }
    ) {
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
export const LAUNCHPAD_STATUS_CHAGED = gql`
  mutation changeLaunchState($Id: ID!, $status: Boolean!) {
    changeLaunchState(Id: $Id, status: $status) {
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

export const ADD_NFT_LOTTERY = gql`
  mutation (
    $endDate: String!
    $ticketPrice: Float!
    $status: Status!
    $prizes: [prizeInput]!
  ) {
    addNFT(
      nftInput: {
        endDate: $endDate
        ticketPrice: $ticketPrice
        status: $status
        prizes: $prizes
      }
    ) {
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
      }
    }
  }
`;

export const UPDATE_NFT_LOTTERRY = gql`
  mutation (
    $id: ID!
    $endDate: String!
    $ticketPrice: Float!
    $status: Status!
    $prizes: [prizeInput]!
  ) {
    updateNFt(
      nftId: $id
      nftInput: {
        endDate: $endDate
        ticketPrice: $ticketPrice
        status: $status
        prizes: $prizes
      }
    ) {
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
      }
    }
  }
`;

export const ADD_NFT_TICKET = gql`
  mutation (
    $walletId: String!
    $dataAccountId: String!
    $transactionId: String!
  ) {
    addNftTicket(
      walletId: $walletId
      dataAccountId: $dataAccountId
      transactionId: $transactionId
    ) {
      walletId
      dataAccountId
      transactionId
    }
  }
`;

export const LOGIN_ADMIN = gql`
  mutation ($username: String!, $password: String!) {
    loginUser(userInput: { username: $username, password: $password }) {
      token
      username
      admin
    }
  }
`;

export const SIGN_UP_ADMIN = gql`
  mutation addAdminUser(
    $username: String!
    $password: String!
    $admin: Boolean!
  ) {
    signupUser(
      userInput: { username: $username, password: $password, admin: $admin }
    ) {
      username
      admin
      id
    }
  }
`;

export const UPDATE_ADMINN_USER = gql`
  mutation updateUser($username: String!, $admin: Boolean!, $id: ID!) {
    updateUser(userEditInput: { username: $username, admin: $admin, id: $id }) {
      username
      admin
      id
    }
  }
`;

export const CHANGE_ADMIN_USER_ROLE = gql`
  mutation updateUserRole($admin: Boolean!, $id: ID!) {
    updateUserRole(userId: $id, admin: $admin) {
      username
      admin
      id
    }
  }
`;

export const CHANGE_ADMIN_USER_PASSWORD = gql`
  mutation changePassword($id: ID!, $password: String!) {
    changePassword(changePasswordInput: { id: $id, password: $password })
  }
`;

export const DELETE_ADMIN_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(userId: $id)
  }
`;
