import "./index.scss";
import PageTitle from "../../components/common/pageTitle/PageTitle";
import CharityTable from "../../components/charity/charityTable/CharityTable";
import Loader from "../../components/common/loader/Loader";
import useReduxState from "../../hooks/useReduxState";
import { ICharity } from "../../api/types/globalData";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_SINGLE_USER } from "../../../graphql/queries";
import { useEffect } from "react";
import useDidUpdateEffect from "../../hooks/useDidUpdateEffect";

export default function Charities({
  charityloading,
}: {
  charityloading: boolean;
}): JSX.Element {
  const [globalData, setGlobalData] = useReduxState(
    (state) => state.globalData
  );
  const [{ lotteryData }] = useReduxState((state) => state.lotteryData);
  const {
    loading,
    data: user,
    refetch,
  } = useQuery(FETCH_SINGLE_USER, {
    variables: {
      UserPK:
        globalData.selectedWallet &&
        globalData.selectedWallet.publicKey &&
        globalData.selectedWallet.publicKey.toString(),
    },
    skip: !globalData.selectedWallet,
  });

  useEffect(() => {
    (async () => {
      const newCharities = await globalData.charities.refetch();
      if (newCharities) {
        setGlobalData({
          type: "SET_GLOBAL_DATA",
          arg: {
            charities: {
              ...globalData.charities,
              charities: newCharities.data.getAllCharities,
            },
          },
        });
      }
    })();
  }, []);
  useEffect(() => {
    if (!globalData.user) {
      (async () => {
        await refetch();
      })();
      if (user) {
        setGlobalData({
          type: "SET_GLOBAL_DATA",
          arg: {
            user: user.getSingleUser,
          },
        });
      }
    }
  }, [globalData.walletConnectedFlag, loading]);
  useDidUpdateEffect(() => {
    (async () => {
      const newCharities = await globalData.charities.refetch();
      if (newCharities) {
        setGlobalData({
          type: "SET_GLOBAL_DATA",
          arg: {
            charities: {
              ...globalData.charities,
              charities: newCharities.data.getAllCharities,
            },
          },
        });
      }
    })();
  }, [globalData.user]);

  if (charityloading || lotteryData.length === 0) {
    return <Loader />;
  } else {
    const sortedCharities: ICharity[] = [
      ...globalData.charities.charities,
    ].sort((a: ICharity, b: ICharity) => {
      if (a.currentVotes > b.currentVotes) {
        return -1;
      }
      if (a.currentVotes < b.currentVotes) {
        return 1;
      }

      return 0;
    });

    return (
      <div className="pageWrapper">
        <div className="charitySection">
          <div id="poolHeader">
            <PageTitle title="Charities" />
          </div>
          {globalData.charities.charities ? (
            <CharityTable rows={lotteryData.Charities} />
          ) : (
            ""
          )}

          <div id="poolHeader" style={{ marginTop: "50px" }}>
            <PageTitle title="Nominate" />
          </div>
          {globalData.charities.charities ? (
            <CharityTable
              rows={sortedCharities.filter((c) => c.Status === true)}
              nominate={true}
            />
          ) : (
            ""
          )}
          <div id="suggest-charity">
            <h4>Suggest</h4>
            <p>
              Want to suggest a charity to be included on the SolLotto platform?
              Please fill out the form here.
            </p>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdMRU7GzeNDukSv-Gq9VJk_rtjVxR5CL-M33GZn8fjrCNxmwA/viewform"
              target="_blank"
              rel="noreferrer"
              className="greenBtn globalBtn"
            >
              Suggest a Charity
            </a>
          </div>
        </div>
      </div>
    );
  }
}
