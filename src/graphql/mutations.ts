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
export const LAUNCHPAD_STATUS_CHAGED = gql`
  mutation changeLaunchState($Id: ID!, $Status: Boolean!) {
    changeLaunchState(Id: $Id, Status: $Status)
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
  mutation changeRaffleStatus($raffleId: ID!, $status: Boolean) {
    changeRaffleStatus(raffleId: $raffleId, status: $status)
  }
`;

export const ADD_POOL = gql`
  mutation addPool(
    $tokenName: String!
    $tokenLogo: String!
    $dueDate: String!
    $tokenAddress: String!
  ) {
    addPool(
      poolInput: {
        tokenName: $tokenName
        tokenLogo: $tokenLogo
        dueDate: $dueDate
        tokenAddress: $tokenAddress
      }
    ) {
      id
      tokenAddress
      tokenLogo
      tokenName
      dueDate
      status
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
  ) {
    updatePool(
      poolId: $id
      poolInput: {
        tokenName: $tokenName
        tokenLogo: $tokenLogo
        dueDate: $dueDate
        tokenAddress: $tokenAddress
      }
    ) {
      id
      tokenAddress
      tokenLogo
      tokenName
      dueDate
      status
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
      status
    }
  }
`;

export const ADD_LAUNCHPAD = gql`
  mutation AddLaunchPad(
    $PoolName: String
    $PoolImage: String
    $TotalWinners: Int
    $TimeRemaining: String
    $MaxDeposit: Int
  ) {
    AddLaunchPad(
      LaunchPadInput: {
        PoolName: $PoolName
        PoolImage: $PoolImage
        TotalWinners: $TotalWinners
        TimeRemaining: $TimeRemaining
        MaxDeposit: $MaxDeposit
      }
    )
  }
`;
export const EDIT_LAUNCH = gql`
  mutation EditLaunchPad(
    $Id: ID!
    $PoolName: String!
    $PoolImage: String!
    $TotalWinners: Int!
    $TimeRemaining: String!
    $MaxDeposit: Int!
  ) {
    EditLaunchPad(
      Id: $Id
      LaunchPadInput: {
        PoolName: $PoolName
        PoolImage: $PoolImage
        TotalWinners: $TotalWinners
        TimeRemaining: $TimeRemaining
        MaxDeposit: $MaxDeposit
      }
    )
  }
`;
