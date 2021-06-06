import {
	SystemProgram,
	PublicKey,
	Transaction,
	TransactionInstruction,
	Account,
	SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import * as borsh from "borsh";
import {
	IncomingLotteryDataAccount,
	LotteryDataAccount,
	IncomingLotteryDataSchema,
	LotteryDataSchema,
} from "./LotteryDataBorsh";

export const initLottery = async (globalData) => {
	let solanaProgramId = new PublicKey(
		process.env.REACT_APP_SOLANA_INIT_LOTTERY_PROGRAM
	);

	try {
		const lotteryDataAccount = new Account();
		const createLotteryDataAccountTx = SystemProgram.createAccount({
			space: 41,
			lamports: await globalData.connection.getMinimumBalanceForRentExemption(
				41,
				"singleGossip"
			),
			fromPubkey: globalData.selectedWallet.publicKey,
			newAccountPubkey: lotteryDataAccount.publicKey,
			programId: solanaProgramId,
		});

		const value = new IncomingLotteryDataAccount(1, 1, 2, 3, 4);
		const buffer = borsh.serialize(IncomingLotteryDataSchema, value);
		const dataArr = new Uint8Array([0, ...buffer]);

		const initLotteryTx = new TransactionInstruction({
			programId: solanaProgramId,
			keys: [
				{
					pubkey: lotteryDataAccount.publicKey,
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
			data: dataArr,
		});
		let transaction = new Transaction().add(
			createLotteryDataAccountTx,
			initLotteryTx
		);
		let signers = [lotteryDataAccount];
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
		const encodedLotteryState = (
			await globalData.connection.getAccountInfo(
				lotteryDataAccount.publicKey,
				"singleGossip"
			)
		).data;
		const decodedLotteryState = borsh.deserialize(
			LotteryDataSchema,
			LotteryDataAccount,
			encodedLotteryState
		);

		console.log(`Lottery Data: ${JSON.stringify(decodedLotteryState)}`);
		console.log(
			`Lottery Data Account PK: ${lotteryDataAccount.publicKey.toBase58()}`
		);
		console.log(`Lottery Data Account PK Bytes: ${lotteryDataAccount}`);
		console.log(lotteryDataAccount.publicKey.toBytes());
		console.log("Transaction " + signature + " confirmed");
	} catch (e) {
		console.warn(e);
		console.log("Error: " + e.message);
	}
};
