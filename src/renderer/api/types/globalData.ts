import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { IAdminUser } from "./AdminData";

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
  raffleStatus: string;
  Status: boolean;
}

export interface IPassLaunch {
  id: string;
  winnersWalletsId: string[];
  finishDate: string;
}
export interface ILaunch {
  id: string;
  tokenName: string;
  tokenLogo: string;
  status: boolean;
  totalWinners: number;
  passLaunches: IPassLaunch[];
  dueDate: string;
  endDate: string;
  maxDeposit: number;
  tokenAddress: string;
  frequency: number;
}
export interface IRaffles {
  refetch: Refetch | null;
  raffles: IRaffle[];
}
export interface ILaunchPad {
  refetch: Refetch | null;
  launchPad: ILaunch[];
}

export interface IPassPool {
  id: string;
  winningWalletId: string;
  finishDate: string;
}

export interface IcurrentPlayers {
  id: string;
  walletId: string;
  deposit: string;
}

export interface IPool {
  id: string;
  tokenName: string;
  tokenLogo: string;
  dueDate: string;
  tokenAddress: string;
  passPools: IPassPool[];
  currentPlayers: IcurrentPlayers[];
  endDate: string;
  frequency: number;
  status: boolean;
}
export interface IPoolForm {
  id: string;
  tokenName: string;
  tokenLogo: string;
  dueDate: string;
  tokenAddress: string;
  frequency: number;
  status: boolean;
}

export interface IPools {
  pools: IPool[];
  refetch: Refetch | null;
}

export interface IAdminUsers {
  users: IAdminUser[];
  refetch: Refetch | null;
}
export interface IPassModel4 {
  id: string;
  winningWalletId: string;
  finishDate: string;
}
export interface IModel4 {
  endDate: string;
  passModel4: IPassModel4[];
}

export interface IglobalData {
  holdingWalletId: string;
  charities: Icharities;
  raffles: IRaffles;
  launchPad: ILaunchPad;
  pools: IPools;
  model4: IModel4;
  adminUsers: IAdminUsers;
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

export interface PhantomProvider {
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
export type IcryptoWallet = PhantomProvider;
