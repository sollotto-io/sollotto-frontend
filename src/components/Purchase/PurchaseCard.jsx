import React from 'react';
import Card from './purchase-components/Card';

import GreenGradientSvg from '../common/GreenGradientSvg';
import GreenGradientSvg2 from '../common/GreenGradientSvg2';
import PurpleGradientSvg from '../common/PurpleGradientSvg';
import { toast } from 'react-toastify';
import PurchaseForm from './PurchaseForm';
import useDidUpdateEffect from '../hooks/useDidUpdateEffect';

import { useSelector } from 'react-redux';
import reduxAction from '../../redux/reduxAction';

import { RandomTicketGenerator } from '../utils/helpers';

import RandomButton from '../common/PrimaryButton';
import useReduxState from '../hooks/useReduxState';

const PurchaseCard = () => {
  const { ticketNumberArr, valid } = useSelector((state) => state.purchaseData);
  const [{ loading, lotteryData }] = useReduxState((state) => state.lotteryData);

  const [globalData] = useReduxState((state) => state.globalData);

  /*   const [userTickets, setUserTickets] = useState([]);

  useEffect(() => {
    if (!userTickets.length) {
      const {
        loading,
        data: lottery,
        refetch,
      } = useQuery(FETCH_LOTTERY_BY_ID, {
        variables: { id: id },
      });
    }
  }, []); */

  const verifyRepeatedTicket = () => {
    if (globalData.selectedWallet) {
      const currentTicket = [...ticketNumberArr];
      const currentWalletId = Buffer.from(globalData.selectedWallet.publicKey.toBytes()).toJSON()
        .data;

      const validate = lotteryData.Tickets.some(
        (t) =>
          t.ticketArray.filter((ti) => currentTicket.includes(ti)).length === 6 &&
          t.walletID.filter((wi) => currentWalletId.includes(wi)).length === 32,
      );

      return validate;
    } else {
      return false;
    }
  };

  useDidUpdateEffect(() => {
    if (!ticketNumberArr.some((n) => n === undefined) && !loading && verifyRepeatedTicket()) {
      toast.warn('Warning: You alredy bought that ticket', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [ticketNumberArr]);

  return (
    <div className="gradientBg gradientBorder">
      <GreenGradientSvg />
      <GreenGradientSvg2 />
      <PurpleGradientSvg />
      <div className="purchaseCard">
        <p
          className="ticketNumInst"
          style={{ marginTop: 0, maxWidth: 400, color: valid ? '#FFF' : '#ff604f' }}
        >
          Please pick your numbers. Choose a number between 1-49 for the first 5 selections, and a
          number between 1-26 for the 6th selection
        </p>
        <RandomButton
          style={{ marginBottom: '20px' }}
          handleClick={() => {
            reduxAction({
              type: 'SET_PURCHASE_DATA',
              arg: {
                ticketNumberArr: RandomTicketGenerator(),
              },
            });
          }}
        >
          Generate Random Ticket
        </RandomButton>
        <PurchaseForm />
      </div>
    </div>
  );
};

export default Card(PurchaseCard);
