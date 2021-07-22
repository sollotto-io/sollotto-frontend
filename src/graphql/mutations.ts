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

  mutation deleteCharity($charityId: ID!, $Status:Boolean!){
    deleteCharity(charityId:$charityId,Status:$Status)
  }

`

export const SEND_IMAGE = gql`
   mutation UploadFile($file: Upload!) {
    uploadFile(file: $file){
      url
    }
  }
`