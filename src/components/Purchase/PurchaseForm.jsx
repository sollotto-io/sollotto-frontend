import React, { useState } from 'react';
import NumberSelector from './NumberSelector/NumberSelector';
import CharitySelector from './CharitySelector/CharitySelector';
import PurchaseButton from './PurchaseButton';
import { ToastContainer, toast } from 'react-toastify';
import TicketPrice from './purchase-components/TicketPrice';
import { ticketPurchase } from './util/ticketPurchase';
import { useMutation } from '@apollo/react-hooks';
import { POST_TICKET } from '../../graphql/mutations';
import CircularProgress from '@material-ui/core/CircularProgress';

import { sortTicketNumber, ticketNumberValidator } from '../utils/helpers';
import { useSelector } from 'react-redux';
import reduxAction from '../../redux/reduxAction';
import useReduxState from '../hooks/useReduxState';

export default function PurchaseForm() {
  const [addTicket] = useMutation(POST_TICKET);
  const [globalData] = useReduxState((state) => state.globalData);
  const [{ lotteryData, refetch }] = useReduxState((state) => state.lotteryData);
  const { ticketNumberArr, selectedCharity } = useSelector((state) => state.purchaseData);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    const ticketNumbers = sortTicketNumber(ticketNumberArr);

    if (ticketNumberValidator(ticketNumbers) && selectedCharity != null) {
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
        charityId: selectedCharity,
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
              {[...ticketNumberArr].splice(0, ticketNumberArr.length - 1).join('-')}-
              {ticketNumberArr[5]}
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

          reduxAction({ type: 'RESET_PURCHASE_DATA', arg: null });

          console.log(ticketNumberArr);
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
        {loading ? (
          <span style={{display:"flex", justifyContent:"center"}}>
          <CircularProgress size={30} />
          </span>
        ) : (
          <span style={{display:"flex", justifyContent:"center"}}>
          
          <PurchaseButton handleSubmit={handleSubmit} />
          </span>
        )}
      </div>
    </form>
  );
}
