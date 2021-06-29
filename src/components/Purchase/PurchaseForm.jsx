import React, { useContext } from 'react';
import NumberSelector from './NumberSelector/NumberSelector';
import CharitySelector from './CharitySelector/CharitySelector';
import PurchaseButton from './PurchaseButton';
import { ToastContainer, toast } from 'react-toastify';
import TicketPrice from './purchase-components/TicketPrice';
import { PurchaseContext } from '../../context/PurchaseContext';
import { GlobalContext } from '../../context/GlobalContext';
import { ticketPurchase } from './util/ticketPurchase';
import { useMutation } from '@apollo/react-hooks';
import { POST_TICKET } from '../../graphql/mutations';
import { LotteryContext } from '../../context/LotteryContext';
import { sortTicketNumber, ticketNumberValidator } from '../utils/helpers';

export default function PurchaseForm() {
  const [addTicket] = useMutation(POST_TICKET);
  const { purchaseData , setPurchaseData } = useContext(PurchaseContext);
  const { globalData } = useContext(GlobalContext);
  const { lotteryData, refetch } = useContext(LotteryContext);

  async function handleSubmit() {
    const ticketNumbers = sortTicketNumber(purchaseData.ticketNumberArr);

    

    if (ticketNumberValidator(ticketNumbers) && purchaseData.selectedCharity != null) {
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
        return false;
      }
      const ticketData = {
        charityId: purchaseData.selectedCharity,
        userWalletPK: globalData.selectedWallet.publicKey.toBytes(),
        ticketNumArr: ticketNumbers,
      };
      const result = await ticketPurchase(globalData, ticketData, lotteryData);

      if (result.success === true) {
       
        try {
          await addTicket({
            variables: {
              DataWallet: Buffer.from(result.DataWallet).toJSON().data,
              walletID: Buffer.from(globalData.selectedWallet.publicKey.toBytes()).toJSON().data,
              ticketArray: ticketNumbers,
              charityId: ticketData.charityId,
              drawingId: lotteryData.id,
            },
          });

          await refetch();
          for(let i = 0;i<6;i++){
            document.getElementById(`ticketNumber${i}`).value = null
          }
          // setPurchaseData({
          //   ...purchaseData,
          //   ticketNumberArr:Array(6)
          // })
          toast.success(
            <div>
              Ticket Purchase is Successful, Your purchased tickets can be found on the results
              page, under the day of your drawing
              <br />
              <br />
              TicketNumber:
              {[...purchaseData.ticketNumberArr]
                .splice(0, purchaseData.ticketNumberArr.length - 1)
                .join('-')}
              -{purchaseData.ticketNumberArr[5]}
              <br />
              Charity:
              {
                lotteryData.Charities[
                  lotteryData.Charities.findIndex((charity) => charity.id === ticketData.charityId)
                ].charityName
              }
            </div>,
            {
              position: 'bottom-left',
              autoClose: 6000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              allowHtml: true,
            },
          );
        } catch (e) {
          console.log(e);
        }
      }

      if (result.success === false) {
        toast.error('Ticket Purchase Unsuccessful, you dont have enough SOL', {
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
  }

  return (
    <form onSubmit={handleSubmit}>
      <NumberSelector />
      <CharitySelector />
      <ToastContainer />
      <div className="purchaseCardFooter">
        <TicketPrice />
        <PurchaseButton handleSubmit={handleSubmit} />
      </div>
    </form>
  );
}
