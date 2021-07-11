import { toast } from "react-toastify";
import random from "random";

export const sortTicketNumber = (ticketNumber: number[]): number[] => [
  ...[...ticketNumber].splice(0, ticketNumber.length - 1).sort((a, b) => a - b),
  ticketNumber[ticketNumber.length - 1],
];

export const RandomTicketGenerator = (): number[] => {
  const winningNumber = [];
  for (let i = 0; i < 6; i++) {
    let randomNumber;
    if (i < 5) {
      let invalidNumber = true;
      while (invalidNumber) {
        randomNumber = random.int(1, 69);
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

const avoidRepeatedNumbers = (ticketNumber: number[]) =>
  [...ticketNumber].splice(0, ticketNumber.length - 1).length ===
  new Set([...ticketNumber].splice(0, ticketNumber.length - 1)).size;

export const ticketNumberValidator = (ticketNumber: number[]): boolean => {
  if (
    ticketNumber.length === 6 &&
    ticketNumber.every((element) => element != null)
  ) {
    if (
      ticketNumber.reduce(
        (accumulator: number[], number: number, index: number) => {
          if (index < ticketNumber.length - 1) {
            if (number >= 1 && number <= 69) accumulator.push(number);
            return accumulator;
          } else {
            if (number >= 1 && number <= 26) accumulator.push(number);
            return accumulator;
          }
        },
        []
      ).length !== 6
    ) {
      toast.error(
        "First 5 Numbers should be 1-69 and last number should be 1-26 ",
        {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return false;
    }

    if (!avoidRepeatedNumbers(ticketNumber)) {
      console.log("hola");
      toast.error("The first 5 numbers cannot be repeated", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }
  } else {
    toast.error("Please pick all numbers and a charity", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return false;
  }
  return true;
};
