import {gql} from "@apollo/client";

export const POST_TICKET = gql`
  mutation addTicket (
    $walletID: [Int]
    $ticketArray: [String]
    $DataWallet: [Int]
    $charityId: Int
    $LotteryId:Int
  ) {
    addTicket(
      walletID: $walletID
      ticketArray: $ticketArray
      DataWallet: $DataWallet
      charityId: $charityId
      LotteryId:$LotteryId
    )
  }
`;


