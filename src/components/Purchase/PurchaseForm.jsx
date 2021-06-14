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
export default function PurchaseForm() {
  const [addTicket] = useMutation(POST_TICKET);
  const {purchaseData} = useContext(PurchaseContext);
  const {globalData} = useContext(GlobalContext);
  const {lotteryData} = useContext(LotteryContext);

  async function handleSubmit() {

    if (
      purchaseData.selectedCharity != null &&
      purchaseData.ticketNumberArr.length === 6 &&
      purchaseData.ticketNumberArr.every((element) => element != null)
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
      if(purchaseData.ticketNumberArr[0] < 1 || purchaseData.ticketNumberArr[0] > 69 || purchaseData.ticketNumberArr[1] < 1 || purchaseData.ticketNumberArr[1] > 69 || purchaseData.ticketNumberArr[2] < 1 || purchaseData.ticketNumberArr[2] > 69 || purchaseData.ticketNumberArr[3] < 1 || purchaseData.ticketNumberArr[3] > 69 || purchaseData.ticketNumberArr[4] < 1 || purchaseData.ticketNumberArr[4] > 69 || purchaseData.ticketNumberArr[5] < 1 || purchaseData.ticketNumberArr[5] > 26){
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
        ticketNumArr: purchaseData.ticketNumberArr,

      };
      const result = await ticketPurchase(globalData, ticketData,lotteryData);
     
      if (result.success === true) {
        try {
          addTicket({
            variables: {
              
                DataWallet: Buffer.from(result.DataWallet).toJSON().data,
                walletID: Buffer.from(globalData.selectedWallet.publicKey.toBytes()).toJSON().data,
                ticketArray: purchaseData.ticketNumberArr,
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
