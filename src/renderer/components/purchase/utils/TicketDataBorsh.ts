export class TicketDataAccount {
  charity_id: string;
  user_wallet_pk: number[];
  ticket_number_arr: number[];
  constructor(
    charity_id: string,
    user_wallet_pk: number[],
    ticket_number_arr: number[]
  ) {
    this.charity_id = charity_id;
    this.user_wallet_pk = user_wallet_pk;
    this.ticket_number_arr = ticket_number_arr;
  }
}
export const TicketDataSchema = new Map([
  [
    TicketDataAccount,
    {
      kind: "struct",
      fields: [
        ["charity_id", "u32"],
        ["user_wallet_pk", [32]],
        ["ticket_number_arr", [6]],
      ],
    },
  ],
]);
