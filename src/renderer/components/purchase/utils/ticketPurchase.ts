import {
  SystemProgram,
  PublicKey,
  Transaction,
  TransactionInstruction,
  Account,
  SYSVAR_RENT_PUBKEY,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import store from "../../../redux/stores/store";
import CryptoJS from "crypto-js";
import { Buffer } from "buffer";
/*eslint-disable  @typescript-eslint/no-non-null-assertion*/
/*eslint-disable  @typescript-eslint/no-explicit-any */
export const ticketPurchase = async (purchaseDataArr: {
  charityId: string;
  userWalletPK: number[];
  ticketNumArr: number[];
  lotteryDataAccount: string;
}): Promise<any> => {
  const state = store.getState();

  const globalData = state.globalData;

  const charityPK = globalData.charities.charities.find(
    (c) => c.id === purchaseDataArr.charityId
  );

  const lotteryDataAccountBytes = CryptoJS.AES.decrypt(
    purchaseDataArr.lotteryDataAccount,
    process.env.REACT_APP_SECRET_KEY!
  );
  const HoldingWalletDecryptedText = JSON.parse(
    lotteryDataAccountBytes.toString(CryptoJS.enc.Utf8)
  );
  const lotteryDataAccount = new Account(HoldingWalletDecryptedText);

  const lotteryInitProgramId = new PublicKey(
    process.env.REACT_APP_SOLANA_INIT_LOTTERY_PROGRAM!
  );

  const holdingWalletPK = new PublicKey(globalData.holdingWalletId);

  if (
    globalData.selectedWallet !== null &&
    globalData.selectedWallet.publicKey !== null
  ) {
    try {
      const data = {
        charity: charityPK?.publicKey,
        user_wallet_pk: globalData.selectedWallet.publicKey.toBytes(),
        ticket_number_arr: purchaseDataArr.ticketNumArr,
      };
      console.log(data);
      const dataArr = new (Buffer as any).alloc(71, JSON.stringify(data)!);

      const ticketDataAccount = new Account();
      const createTicketDataAccountTx = SystemProgram.createAccount({
        space: 71,
        lamports: await globalData.connection.getMinimumBalanceForRentExemption(
          71,
          "singleGossip"
        ),
        fromPubkey: globalData.selectedWallet.publicKey,
        newAccountPubkey: ticketDataAccount.publicKey,
        programId: lotteryInitProgramId,
      });

      const purchaseTicketTx = new TransactionInstruction({
        programId: lotteryInitProgramId,
        keys: [
          {
            pubkey: lotteryDataAccount.publicKey,
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: ticketDataAccount.publicKey,
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: globalData.selectedWallet.publicKey,
            isSigner: true,
            isWritable: false,
          },
          {
            pubkey: holdingWalletPK,
            isSigner: true,
            isWritable: false,
          },
          { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
          { pubkey: holdingWalletPK, isSigner: false, isWritable: false },
        ],
        data: dataArr,
      });
      const transaction = new Transaction().add(
        createTicketDataAccountTx,
        purchaseTicketTx
      );

      const signers = [lotteryDataAccount];

      transaction.recentBlockhash = (
        await globalData.connection.getRecentBlockhash()
      ).blockhash;
      transaction.setSigners(
        globalData.selectedWallet.publicKey,
        ...signers.map((s) => s.publicKey)
      );

      const signedTx = await globalData.selectedWallet.signTransaction(
        transaction
      );
      const signature = await globalData.connection.sendTransaction(
        signedTx,
        signers
      );
      await globalData.connection.confirmTransaction(signature, "singleGossip");

      return {
        DataWallet: ticketDataAccount.publicKey.toBytes(),
        success: true,
        signature: signature,
      };
    } catch (e) {
      console.log(e);
      return { success: false };
    }
  }
};
