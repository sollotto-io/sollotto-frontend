import { toast } from 'react-toastify';

export const sortTicketNumber = (ticketNumber) => [
  ...[...ticketNumber].splice(0, ticketNumber.length - 1).sort((a, b) => a - b),
  ticketNumber[ticketNumber.length - 1],
];

const avoidRepeatedNumbers = (ticketNumber) =>
  [...ticketNumber].splice(0, ticketNumber.length - 1).length ===
  new Set([...ticketNumber].splice(0, ticketNumber.length - 1)).size;

export const ticketNumberValidator = (ticketNumber) => {
  if (ticketNumber.length === 6 && ticketNumber.every((element) => element != null)) {
    if (
      ticketNumber.reduce((accumulator, number, index) => {
        if (index < ticketNumber.length - 1) {
          if (number >= 1 && number <= 69) accumulator.push(number);
          return accumulator;
        } else {
          if (number >= 1 && number <= 26) accumulator.push(number);
          return accumulator;
        }
      }, []).length !== 6
    ) {
      toast.error('First 5 Numbers should be 1-69 and last number should be 1-26 ', {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }

    if (!avoidRepeatedNumbers(ticketNumber)) {
      console.log('hola');
      toast.error('The first 5 numbers cannot be repeated', {
        position: 'bottom-left',
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
    toast.error('Please pick all numbers and a charity', {
      position: 'bottom-left',
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
