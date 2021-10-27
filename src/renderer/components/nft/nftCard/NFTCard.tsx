import "./index.scss";
import GreenGradientSvg2 from "../../common/greenGradientSvg2/GreenGradientSvg2";
import GreenGradientSvg from "../../common/greenGradientSvg/GreenGradientSvg";
import PurpleGradientSvg from "../../common/purpleGradientSvg/PurpleGradientSvg";
import FirstPrize from "../../../../assets/images/pictures/1.png";
import SecondPrize from "../../../../assets/images/pictures/3.png";
import ThirdtPrize from "../../../../assets/images/pictures/3.png";
import TicketPrice from "../../purchase/ticketPrice/TicketPrice";
import { CircularProgress } from "@material-ui/core";
import PurchaseButton from "../../purchase/purchaseForm/purchaseButton/PurchaseButton";
import { useState } from "react";
import useTypedReduxState from "../../../hooks/useTypedReduxState";
import { ToastContainer, toast } from "react-toastify";
import { ADD_NFT_TICKET } from "../../../../graphql/mutations";
import { useMutation } from "@apollo/react-hooks";

export default function NFTCard(): JSX.Element {
  const [loading, setLoading] = useState(false);

  const [{ nfts, selectedWallet, walletBalance }, setGlobalData] =
    useTypedReduxState((state) => state.globalData);

  const currentNft = nfts.nfts.filter((n) => n.status === "live")[0];

  const { prizes } = currentNft;

  const [addNftTicket] = useMutation(ADD_NFT_TICKET, {
    onCompleted: () => {
      const nftSCopy = [...nfts.nfts];
      const index = nftSCopy.findIndex((n) => n.status === "live");

      if (index !== -1) {
        (async () => {
          if (nfts.refetch) {
            const nfs = await nfts.refetch();
            nftSCopy[index] = nfs.data.getActiveNft;
            setGlobalData({
              type: "SET_GLOBAL_DATA",
              arg: {
                nfts: {
                  nfts: [...nftSCopy],
                  refetch: nfts.refetch,
                },
              },
            });
          }
        })();
      }
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleSubmit = () => {
    if (!currentNft) {
      toast.error("Please wait until the next lottery starts", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (!selectedWallet) {
        toast.error("Please connect your wallet", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        if (walletBalance < currentNft.ticketPrice) {
          toast.error(
            "Ticket purchase unsuccessful. You dont have enough SOL in your wallet to purchase a ticket",
            {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        } else {
          (async () => {
            setLoading(true);
            console.log(
              JSON.stringify({
                walletId: selectedWallet.publicKey?.toString(),
                dataAccountId: selectedWallet.publicKey?.toString(),
                transactionId: selectedWallet.publicKey?.toString(),
              })
            );
            await addNftTicket({
              variables: {
                walletId: selectedWallet.publicKey?.toString(),
                dataAccountId: selectedWallet.publicKey?.toString(),
                transactionId: selectedWallet.publicKey?.toString(),
              },
            });
            setLoading(false);
          })();
        }
      }
    }
  };

  return (
    <div className="card">
      <div className="gradientBg gradientBorder">
        <GreenGradientSvg />
        <GreenGradientSvg2 />
        <PurpleGradientSvg />

        <ToastContainer />
        <div className="nft-card-container">
          <div className="nft-card">
            <div className="nft-card-prize">
              <img src={FirstPrize} />
              <p>First Prize</p>
            </div>
            <img src={process.env.REACT_APP_IMAGE_LINK + prizes[0].image} />
          </div>
          <div className="nft-card">
            <div className="nft-card-prize">
              <img src={SecondPrize} />
              <p>Second Prize</p>
            </div>
            <img src={process.env.REACT_APP_IMAGE_LINK + prizes[1].image} />
          </div>
          <div className="nft-card">
            <div className="nft-card-prize">
              <img src={ThirdtPrize} />
              <p>Third Prize</p>
            </div>
            <img src={process.env.REACT_APP_IMAGE_LINK + prizes[2].image} />
          </div>

          <div className="nft-card-footer">
            <TicketPrice price={currentNft.ticketPrice} />
            {loading ? (
              <span style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress size={30} />
              </span>
            ) : (
              <span style={{ display: "flex", justifyContent: "center" }}>
                <PurchaseButton handleSubmit={handleSubmit} />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
