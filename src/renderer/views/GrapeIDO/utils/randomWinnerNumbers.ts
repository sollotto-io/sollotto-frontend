import random from "random";

export const sortTicketNumber = (ticketNumber:number[]):number[] => [
    ...[...ticketNumber].splice(0, ticketNumber.length - 1).sort((a, b) => a - b),
    ticketNumber[ticketNumber.length - 1],
  ];
 

export const RandomTicketGenerator = (users:number):number[] => {
    const winningNumber = [];
    for (let i = 0; i < 6; i++) {
      let randomNumber;
      if (i < 5) {
        let invalidNumber = true;
        while (invalidNumber) {
          randomNumber = random.int(1, users);
          if (winningNumber.indexOf(randomNumber) === -1) {
            winningNumber.push(randomNumber);
            invalidNumber = false;
          }
        }
      } else {
        randomNumber = random.int(1, 26);
        winningNumber.push(randomNumber);
      }
    }
    return sortTicketNumber(winningNumber);
  };