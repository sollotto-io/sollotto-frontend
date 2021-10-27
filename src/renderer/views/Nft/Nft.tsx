import "./index.scss";
import PageTitle from "../../components/common/pageTitle/PageTitle";
import TicketPrice from "../../components/purchase/ticketPrice/TicketPrice";
import NftHeaderInfo from "../../components/nft/nftheaderInfo/HeadeInfo";
import NFTCard from "../../components/nft/nftCard/NFTCard";

import { useQuery } from "@apollo/react-hooks";

import { FETCH_ACTIVE_NFT_LOTTERY } from "../../../graphql/queries";
import useTypedReduxState from "../../hooks/useTypedReduxState";
import Loader from "../../components/common/loader/Loader";

export default function NFT(): JSX.Element {
  const [
    {
      nfts: { nfts },
    },
    setGlobalData,
  ] = useTypedReduxState((state) => state.globalData);
  const { refetch } = useQuery(FETCH_ACTIVE_NFT_LOTTERY, {
    onCompleted: (e) => {
      setGlobalData({
        type: "SET_GLOBAL_DATA",
        arg: {
          nfts: {
            nfts: [e.getActiveNft],
            refetch: refetch,
          },
        },
      });
    },
  });

  const currentNft = nfts.filter((n) => n.status === "live")[0];
  if (nfts.length === 0) {
    return <Loader />;
  }

  return (
    <div className="pageWrapper">
      <div id="nft-section">
        <div className="nft-header">
          <PageTitle title="NFT Lottery" />
          {currentNft ? (
            <TicketPrice price={currentNft.ticketPrice} />
          ) : (
            <p style={{ margin: 0 }}>Wait until the next lottery starts</p>
          )}
          <NftHeaderInfo />
        </div>
        <NFTCard />
      </div>
    </div>
  );
}
