import { gql } from '@apollo/client';

export const POST_TICKET = gql`
  mutation addTicket(
    $walletID: [Int]
    $ticketArray: [Int]
    $DataWallet: [Int]
    $charityId: String!
    $drawingId: String!
    $TransactionId:String!
  ) {
    addTicket(
      walletID: $walletID
      ticketArray: $ticketArray
      DataWallet: $DataWallet
      charityId: $charityId
      drawingId: $drawingId
      TransactionId:$TransactionId
    )
  }
`;
