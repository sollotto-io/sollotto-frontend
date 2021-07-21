import "./index.scss";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import ResultDetailContent from "./resultDetailContent/ResultDetailContent";
import { useQuery } from "@apollo/react-hooks";
import LeftCountdown from "./leftCountDown/LetCountDown";
import Loader from "../../common/loader/Loader";
import moment from "moment";
import _ from "lodash";
import useReduxState from "../../../hooks/useReduxState";
import { IDrawingId } from "../../../api/types/lotteryData";
import { FETCH_LOTTERY_BY_ID } from "../../../../graphql/queries";
import PageTitle from "../../common/pageTitle/PageTitle";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const ResultDetail = (): JSX.Element => {
  const { id }: { id: string } = useParams();
  const [globalData] = useReduxState((state) => state.globalData);

  if (globalData.selectedWallet === null) {
    console.log("empty");
    window.location.href = "/results";
  }

  // const {
  //   loading: ticketLoading,
  //   data: usertickets,
  //   refetch,
  // } = useQuery(FETCH_USER_TICKET, {
  //   variables: {
  //     walletID: Buffer.from(globalData.selectedWallet.publicKey.toBytes()).toJSON().data,
  //     LotteryId: parseInt(id),
  //   },
  // });
  const {
    loading,
    data: lottery,
    refetch,
  } = useQuery(FETCH_LOTTERY_BY_ID, {
    variables: { id: id },
  });

  useEffect(() => {
    refetch();
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    console.log(lottery);
    const userTickets: {
      array: number[];
      charity: string;
      transactionId: string;
    }[] = [];
    lottery.getDrawingById.Tickets.forEach((t: IDrawingId["Tickets"][0]) => {
      const flag = _.isEqual(
        t.walletID,
        Buffer.from(globalData.selectedWallet.publicKey.toBytes()).toJSON().data
      );

      if (flag) {
        userTickets.push({
          array: t.ticketArray,
          charity: t.charityId.charityName,
          transactionId: t.TransactionId,
        });
      }
    });
    return (
      <div className="resultdetailSection">
        <PageTitle title="Draw Detail" />
        <div className="topSection">
          <ResultDetailContent lotteryData={lottery.getDrawingById} />
          <LeftCountdown lotteryData={lottery.getDrawingById} />
        </div>
        <div className="bottomSectionResult gradientBg2">
          <div id="ticket-details">
            <div className="leftColumn">
              <h4>SolLotto Pick 6</h4>
              <p>{moment(lottery.getDrawingById.EndDate).format("LL")}</p>
            </div>
            <div className="rightColumn">
              <h4 style={{ marginBottom: "10px" }}>
                Your Numbers and Charities
              </h4>
              <p style={{ marginBottom: "20px" }}>
                (Your choices have been reordered from smallest to largest for
                the first five numbers)
              </p>
              {userTickets.length === 0 ? (
                <p>No Tickets Bought</p>
              ) : (
                userTickets.map((t, i) => {
                  return (
                    <div className="entryRow" key={i}>
                      <p className="numColumn">
                        <span>{t.array[0]}</span>
                        <span>{t.array[1]}</span>
                        <span>{t.array[2]}</span>
                        <span>{t.array[3]}</span>
                        <span>{t.array[4]}</span>
                        <span>{t.array[5]}</span>
                        {/*                         {t.array[0]}&nbsp;&nbsp;{t.array[1]}&nbsp;&nbsp;
                        {t.array[2]}&nbsp;&nbsp;{t.array[3]}&nbsp;&nbsp;
                        {t.array[4]}&nbsp;&nbsp;{t.array[5]}&nbsp;&nbsp; */}
                      </p>{" "}
                      <p className="chaColumn">{t.charity}</p>
                      {t.transactionId === "" ? (
                        <span style={{display:"flex",justifyContent:"space-around"}}><ErrorOutlineIcon style={{color:"yellow"}}/> <p style={{color:"yellow" ,marginLeft:10}}>This ticket does not have a transaction ID</p></span>
                      ) : (
                        <a
                          style={{ textDecoration: "underline" }}
                          href={`https://solscan.io/tx/${t.transactionId}?cluster=devnet`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Your Transacton
                        </a>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ResultDetail;
