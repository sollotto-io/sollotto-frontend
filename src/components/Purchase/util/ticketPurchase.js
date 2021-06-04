import {
	SystemProgram,
	PublicKey,
	Transaction,
	TransactionInstruction,
	Account,
	SYSVAR_RENT_PUBKEY,
	LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import * as borsh from "borsh";
import { TicketDataAccount, TicketDataSchema } from "./TicketDataBorsh";
import { LotteryDataAccount, LotteryDataSchema } from "./LotteryDataBorsh";

export const ticketPurchase = async (globalData, purchaseDataArr) => {
	let lotteryInitProgramId = new PublicKey(
		process.env.REACT_APP_SOLANA_INIT_LOTTERY_PROGRAM
	);
	let lotteryDataAccountPK = new PublicKey(
		"7M4zeQxrLTzKRLwhiNyvFox5HudffTmcNNxE2gTRiNby"
	);
	let holdingWalletPK = new PublicKey(globalData.holdingWalletId);
	const encodedLotteryState = (
		await globalData.connection.getAccountInfo(lotteryDataAccountPK)
	).data;
	const decodedLotteryState = borsh.deserialize(
		LotteryDataSchema,
		LotteryDataAccount,
		encodedLotteryState
	);
	try {
		const solTransferTx = SystemProgram.transfer({
			fromPubkey: globalData.selectedWallet.publicKey,
			toPubkey: holdingWalletPK,
			lamports: globalData.currentLottery.ticketPrice * LAMPORTS_PER_SOL,
		});
		const value = new TicketDataAccount(
			purchaseDataArr.charityId,
			purchaseDataArr.userWalletPK,
			purchaseDataArr.ticketNumArr
		);
		const buffer = borsh.serialize(TicketDataSchema, value);
		const dataArr2 = new Uint8Array([1, ...buffer]);

		const ticketDataAccount = new Account();
		const createTicketDataAccountTx = SystemProgram.createAccount({
			space: 42,
			lamports: await globalData.connection.getMinimumBalanceForRentExemption(
				42,
				"singleGossip"
			),
			fromPubkey: globalData.selectedWallet.publicKey,
			newAccountPubkey: ticketDataAccount.publicKey,
			programId: lotteryInitProgramId,
		});

		const purchaseTicketTx = new TransactionInstruction({
			programId: lotteryInitProgramId,
			keys: [
				{ pubkey: lotteryDataAccountPK, isSigner: false, isWritable: true },
				{
					pubkey: ticketDataAccount.publicKey,
					isSigner: false,
					isWritable: true,
				},
				{ pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
				{
					pubkey: globalData.selectedWallet.publicKey,
					isSigner: true,
					isWritable: false,
				},
			],
			data: dataArr2,
		});
		let transaction = new Transaction().add(
			solTransferTx,
			createTicketDataAccountTx,
			purchaseTicketTx
		);
		let signers = [ticketDataAccount];

		transaction.recentBlockhash = (
			await globalData.connection.getRecentBlockhash()
		).blockhash;
		transaction.setSigners(
			globalData.selectedWallet.publicKey,
			...signers.map((s) => s.publicKey)
		);
		if (signers.length > 0) {
			transaction.partialSign(...signers);
		}

		let signedTx = await globalData.selectedWallet.signTransaction(transaction);

		let signature = await globalData.connection.sendRawTransaction(
			signedTx.serialize()
		);
		console.log(
			"Submitted transaction " + signature + ", awaiting confirmation"
		);
		await globalData.connection.confirmTransaction(signature, "singleGossip");
		const encodedTicketState = await globalData.connection.getAccountInfo(
			ticketDataAccount.publicKey,
			"singleGossip"
		);
		const decodedTicketState = borsh.deserialize(
			TicketDataSchema,
			TicketDataAccount,
			encodedTicketState.data
		);
		console.log(ticketDataAccount.publicKey);
		console.log("Transaction " + signature + " confirmed");
	} catch (e) {
		console.warn(e);
		console.log("Error: " + e.message);
	}
};
