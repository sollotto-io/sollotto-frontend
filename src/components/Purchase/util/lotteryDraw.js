import {
  SystemProgram,
  PublicKey,
  Transaction,
  TransactionInstruction,
  Account,
  SYSVAR_RENT_PUBKEY,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import * as borsh from 'borsh';
import random from 'random';
import { TicketDataAccount, TicketDataSchema } from './TicketDataBorsh';
import { LotteryDataAccount, LotteryDataSchema } from './LotteryDataBorsh';

export const lotteryDraw = async (data, globalData) => {
  console.log(data.getDataWallets);
  const lotteryDataAccountPKArr = [];
  const winningNumberArr = [
    random.int(1, 49),
    random.int(1, 49),
    random.int(1, 49),
    random.int(1, 49),
    random.int(1, 49),
    random.int(1, 26),
  ];
  let winFlag = false;

  // Fetch DataWallet
  const usersTicketNumberArr = lotteryDataAccountPKArr.map(async (publicKey) => {
    const encodedTicketDataState = await globalData.connection.getAccountInfo(
      publicKey,
      'singleGossip',
    );
    const decodedTicketDataState = borsh.deserialize(
      TicketDataSchema,
      TicketDataAccount,
      encodedTicketDataState.data,
    );

    return decodedTicketDataState.data.charity_id.ticket_number_arr;
  });
  let winnerUserWalletPK = null;
  usersTicketNumberArr.forEach((numberArr, index) => {
    if (numberArr === winningNumberArr) {
      winnerUserWalletPK = lotteryDataAccountPKArr[index];
      winFlag = true;
    }
  });

  console.log(winningNumberArr);
  console.log(winnerUserWalletPK);
  console.log(winFlag);
  alert(
    `Winning Numbers: ${winningNumberArr} \nWinner Wallet: ${
      winnerUserWalletPK || 'None'
    } \n`,
  );
};
