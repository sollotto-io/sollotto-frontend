import React,{useContext} from 'react'
import NumberSelector from './NumberSelector/NumberSelector';
import CharitySelector from './CharitySelector/CharitySelector';
import PurchaseButton from './PurchaseButton';
import { ToastContainer,toast } from 'react-toastify';
import TicketPrice from './purchase-components/TicketPrice';
import { PurchaseContext } from '../../context/PurchaseContext';
import { GlobalContext } from '../../context/GlobalContext';
import { ticketPurchase } from './util/ticketPurchase';
import { useMutation } from '@apollo/react-hooks';
import { POST_TICKET } from '../../graphql/mutations';
import { LotteryContext } from '../../context/LotteryContext';
import { sortTicketNumber } from '../utils/hepers';

export default function PurchaseForm() {
  const [addTicket] = useMutation(POST_TICKET);
  const {purchaseData} = useContext(PurchaseContext);
  const {globalData} = useContext(GlobalContext);
  const {lotteryData, refetch} = useContext(LotteryContext);

  async function handleSubmit() {

    const ticketNumbers=sortTicketNumber(purchaseData.ticketNumberArr);

    if (
      purchaseData.selectedCharity != null &&
      ticketNumbers.length === 6 &&
      ticketNumbers.every((element) => element != null)
    ) {
      if (globalData.selectedWallet === null) {
        toast.error('Please Connect your Wallet! ', {
          position: 'bottom-left',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      if(ticketNumbers[0] < 1 || ticketNumbers[0] > 69 || ticketNumbers[1] < 1 || ticketNumbers[1] > 69 || ticketNumbers[2] < 1 || ticketNumbers[2] > 69 || ticketNumbers[3] < 1 || ticketNumbers[3] > 69 || ticketNumbers[4] < 1 || ticketNumbers[4] > 69 || ticketNumbers[5] < 1 || ticketNumbers[5] > 26){
        toast.error("First 5 Numbers should be 1-69 and last number should be 1-26 ", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      const ticketData = {
        charityId: purchaseData.selectedCharity,
        userWalletPK: globalData.selectedWallet.publicKey.toBytes(),
        ticketNumArr: ticketNumbers,

      };
      const result = await ticketPurchase(globalData, ticketData,lotteryData);
     
      if (result.success === true) {
        try {
          addTicket({
            variables: {
              
                DataWallet: Buffer.from(result.DataWallet).toJSON().data,
                walletID: Buffer.from(globalData.selectedWallet.publicKey.toBytes()).toJSON().data,
                ticketArray: ticketNumbers,
                charityId: ticketData.charityId,
                drawingId: lotteryData.id,
              
             
            },
          });
          toast.success(
            'Ticket Purchase is Successful, Your purchased tickets can be found on the results page, under the day of your drawing',
            {
              position: 'bottom-left',
              autoClose: 6000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            },
          );
          refetch();
        } catch (e) {
          console.log(e);
        }
      } else if (result.success === false) {
        toast.error('Ticket Purchase Unsuccessful', {
          position: 'bottom-left',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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

    }
  }

  return (
    <form onSubmit={handleSubmit}>
            <NumberSelector/>
            <CharitySelector />
            <ToastContainer />
            <div className="purchaseCardFooter">
              <TicketPrice />
              <PurchaseButton handleSubmit={handleSubmit} />
            </div>
          </form>
  )
}
