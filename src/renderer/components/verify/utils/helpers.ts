export function getSolScanLink(publicKey: string): string {
  return `https://solscan.io/account/${publicKey} ?cluster=devnet`;
}
