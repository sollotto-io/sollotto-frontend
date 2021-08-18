import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import Wallet from "@project-serum/sol-wallet-adapter";

type Refetch = () => Promise<any>;
export interface ICharity {
  id: string;
  charityName: string;
  projectDetails: string;
  ImageURL: string;
  fundUse: string;
  currentVotes: number;
  addedBy: string;
  lifeTimeVotes: number;
  lifeTimeWins: number;
  Status: boolean;
  Years: string;
  URL: string;
  isWatch: boolean;
  Grade: string;
  Impact: string;
  webURL: string;
  socialMedia: string;
  nominationVotes: number;
  lifeTimeNominationVotes: number;
  publicKey: string;
}
export interface Icharities {
  refetch: Refetch | null;
  charities: ICharity[];
}

export interface IRaffle {
  id: string;
  raffleName: string;
  urlSlug: string;
  raffleImage: string;
  sollotoBranding: boolean;
  testingWA: string;
  liveWA: string;
  operatorWa: string;
  vanityUrl: string;
  raffleStatus: "Testing" | "Completed" | "Live";
  status: boolean;
}
export interface IRaffles {
  refetch: Refetch | null;
  raffles: IRaffle[];
}

export interface IglobalData {
  holdingWalletId: string;
  charities: Icharities;
  raffles: IRaffles;
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
