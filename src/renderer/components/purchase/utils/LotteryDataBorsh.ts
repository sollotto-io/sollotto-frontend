function intToBool(i: number): boolean {
  if (i === 0) {
    return false;
  }
  return true;
}

function boolToInt(t: boolean): number {
  if (t) {
    return 1;
  }
  return 0;
}

const boolMapper = {
  encode: boolToInt,
  decode: intToBool,
};

export class IncomingLotteryDataAccount {
  lottery_id: number;
  charity_id_1: number;
  charity_id_2: number;
  charity_id_3: number;
  charity_id_4: number;
  constructor(
    lottery_id: number,
    charity_id_1: number,
    charity_id_2: number,
    charity_id_3: number,
    charity_id_4: number
  ) {
    this.lottery_id = lottery_id;
    this.charity_id_1 = charity_id_1;
    this.charity_id_2 = charity_id_2;
    this.charity_id_3 = charity_id_3;
    this.charity_id_4 = charity_id_4;
  }
}

export const IncomingLotteryDataSchema = new Map([
  [
    IncomingLotteryDataAccount,
    {
      kind: "struct",
      fields: [
        ["lottery_id", "u32"],
        ["charity_id_1", "u32"],
        ["charity_id_2", "u32"],
        ["charity_id_3", "u32"],
        ["charity_id_4", "u32"],
      ],
    },
  ],
]);
export class LotteryDataAccount {
  is_lottery_initialised: number;
  lottery_id: number;
  charity_1_id: number;
  charity_2_id: number;
  charity_3_id: number;
  charity_4_id: number;
  charity_1_vc: number;
  charity_2_vc: number;
  charity_3_vc: number;
  charity_4_vc: number;

  total_registrations;
  constructor(
    is_lottery_initialised: number,
    lottery_id: number,
    charity_1_id: number,
    charity_2_id: number,
    charity_3_id: number,
    charity_4_id: number,
    charity_1_vc: number,
    charity_2_vc: number,
    charity_3_vc: number,
    charity_4_vc: number,

    total_registrations: number
  ) {
    this.is_lottery_initialised = is_lottery_initialised;
    this.lottery_id = lottery_id;
    this.charity_1_id = charity_1_id;
    this.charity_2_id = charity_2_id;
    this.charity_3_id = charity_3_id;
    this.charity_4_id = charity_4_id;
    this.charity_1_vc = charity_1_vc;
    this.charity_2_vc = charity_2_vc;
    this.charity_3_vc = charity_3_vc;
    this.charity_4_vc = charity_4_vc;

    this.total_registrations = total_registrations;
  }
}
export const LotteryDataSchema = new Map([
  [
    LotteryDataAccount,
    {
      kind: "struct",
      fields: [
        ["is_lottery_initialised", "u8", boolMapper],
        ["lottery_id", "u32"],
        ["charity_1_id", "u32"],
        ["charity_2_id", "u32"],
        ["charity_3_id", "u32"],
        ["charity_4_id", "u32"],
        ["charity_1_vc", "u32"],
        ["charity_2_vc", "u32"],
        ["charity_3_vc", "u32"],
        ["charity_4_vc", "u32"],

        ["total_registrations", "u32"],
      ],
    },
  ],
]);
