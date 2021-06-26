import React, { useContext, useState } from 'react';
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
import Loader from '../common/Loader';

export default function PurchaseForm() {
  const [addTicket] = useMutation(POST_TICKET);
  const { purchaseData, setPurchaseData } = useContext(PurchaseContext);
  const { globalData } = useContext(GlobalContext);
  const { lotteryData, refetch } = useContext(LotteryContext);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
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
          setLoading(false);
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

          console.log(purchaseData);

          setPurchaseData({ ...purchaseData, ticketNumberArr: [] });

          console.log(purchaseData.ticketNumberArr);
        } catch (e) {
          console.log(e);
        }
      }

      if (result.success === false) {
        setLoading(false);
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
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <NumberSelector />
      <CharitySelector />
      <ToastContainer />
      <div className="purchaseCardFooter">
        <TicketPrice />
        {loading ? (
          <Loader style={{ height: '100%' }} />
        ) : (
          <PurchaseButton handleSubmit={handleSubmit} />
        )}
      </div>
    </form>
  );
}
