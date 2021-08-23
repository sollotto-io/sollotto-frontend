import random from "random";

export const sortTicketNumber = (ticketNumber: number[]): number[] => [
  ...[...ticketNumber].splice(0, ticketNumber.length - 1).sort((a, b) => a - b),
  ticketNumber[ticketNumber.length - 1],
];

export const RandomTicketGeneratorIDO = (
  users:number,
  winners:number,
): number[] => {
  const winningNumber = [];
  if (winners > 0) {
    for (let i = 0; i < winners; i++) {
      let randomNumber;
      if (i < winners) {
        let invalidNumber = true;
        while (invalidNumber) {
          randomNumber = random.int(1, users);
          if (winningNumber.indexOf(randomNumber) === -1) {
            winningNumber.push(randomNumber);
            invalidNumber = false;
          }
        }
      }
    }
  }
  return sortTicketNumber(winningNumber);
};
