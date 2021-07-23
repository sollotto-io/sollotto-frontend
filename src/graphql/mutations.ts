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

