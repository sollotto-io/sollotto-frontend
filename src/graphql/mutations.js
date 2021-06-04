import gql from "graphql-tag";

export const POST_TICKET = gql`
  mutation addTicket(
    $walletID: [Int!]!
    $ticketArray: [Int!]!
    $DataWallet: [Int!]!
    $charityId: Int
  ) {
    addTicket(
      walletID: $walletID
      ticketArray: $ticketArray
      DataWallet: $DataWallet
      charityId: $charityId
    ) {
      id
      walletID
      ticketArray
      DataWallet
      charityId
    }
  }
`;
