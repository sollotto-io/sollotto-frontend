import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import Wallet from "@project-serum/sol-wallet-adapter";

type Refetch = () => Promise<void>;

export interface ICharity {
  id: string;
  charityName: string;
  projectDetails: string;
  fundUse: string;
  currentVotes: number;
  addedBy: string;
  lifeTimeVotes: number;
  lifeTimeWins: number;
  Status: string;
  Years: string;
  URL: string;
  isWatch: boolean;
  Grade: string;
  Impact: string;
  webURL: string;
  socialMedia: string;
  nominationVotes: number;
}
export interface Icharities {
  refetch: Refetch | null;
  charities: ICharity[];
}
export interface IglobalData {
  holdingWalletId: string;
  charities: Icharities;
  selectedWallet: PhantomProvider | null;
  walletBalance: number;
  walletConnectedFlag: boolean;
  connection: Connection;
  user: { id: string; TokenValue: number; UserPK: string } | null;
}

type PhantomEvent = "disconnect" | "connect";
type PhantomRequestMethod =
  | "connect"
  | "disconnect"
  | "signTransaction"
  | "signAllTransactions";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  autoApprove: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<void>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<any>;
}
/* type WalletEvent = "disconnect" | "connect";
type WalletRequestMethod =
  | "connect"
  | "disconnect"
  | "signTransaction"
  | "signAllTransactions";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}
 */
export type IcryptoWallet = typeof Wallet;
