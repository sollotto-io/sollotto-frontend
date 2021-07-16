import { useState, useCallback } from "react";
import "./index.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Fade } from "@material-ui/core";
import useReduxState from "../../../../hooks/useReduxState";
import CloseIcon from "@material-ui/icons/Close";
import useDidUpdateEffect from "../../../../hooks/useDidUpdateEffect";
import { POST_USER_VOTES } from "../../../../../graphql/mutations";
import { useMutation } from "@apollo/react-hooks";

export default function NominationModal({ id }: { id: string }): JSX.Element {
  const [{ user }] = useReduxState((state) => state.globalData);

  const initialVoteCount = user ? user.TokenValue : 0;
  const [modal, setModal] = useState(false);
  const [votes, setVotes] = useState<number>(initialVoteCount);
  const [hasChanged, setHasChanged] = useState(false);
  const [{ walletConnectedFlag }, setGlobalData] = useReduxState(
    (state) => state.globalData
  );
  const [postVotes, { data }] = useMutation(POST_USER_VOTES);
  const handleHasChanged = useCallback(() => {
    if (votes !== initialVoteCount) {
      setHasChanged(true);
    }
  }, [votes]);

  useDidUpdateEffect(() => {
    handleHasChanged();
  }, [votes]);

  const handleModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    setModal(!modal);
  };

  const handleVotes = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVotes(parseInt(e.target.value));
    },
    [votes]
  );
  const handleNomination = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (!walletConnectedFlag) {
      toast.error("Please Connect your Wallet! ", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (!user) {
        toast.error(
          "Please Purchase a ticket to being able to vote for the next charity ",
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
      } else if (user.TokenValue === 0) {
        toast.error("You have no votes left", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setModal(true);
      }
    }
  };

  const handleVotesSubmit = (e: React.MouseEvent<HTMLElement>) => {
    console.log("Hola" + votes);
    try {
      (async () => {
        console.log(
          JSON.stringify({
            charityId: id,
            UserPk: user && user.UserPK,
            Votes: initialVoteCount + votes,
          })
        );
        await postVotes({
          variables: {
            charityId: id,
            UserPk: user && user.UserPK,
            Votes: votes,
          },
        });
        console.log(data);
      })();
      setGlobalData({
        type: "SET_GLOBAL_DATA",
        arg: {
          user: {
            ...user,
            TokenValue:
              initialVoteCount - votes > 0 ? initialVoteCount - votes : 0,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
    handleModal(e);
  };
  return (
    <>
      <button
        type="button"
        onClick={handleNomination}
        style={{ cursor: "pointer" }}
        id="addedBy-Table"
        className="nominate-button gradientBg gradientBorder"
      >
        Vote Now
      </button>
      <ToastContainer />
      <Modal
        open={modal}
        onClose={handleModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className="n-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <Fade in={modal}>
          <div className="n-modal-content gradientBg gradientBorder">
            <div className="n-modal-body">
              <div className="n-modal-header">
                <h3>Nominate</h3>
                <p>
                  votes Remaining:{" "}
                  {((): number => {
                    if (initialVoteCount > votes) {
                      if (votes < 0) {
                        return initialVoteCount;
                      } else {
                        return initialVoteCount - votes;
                      }
                    }
                    return 0;
                  })()}
                </p>
                <div onClick={handleModal}>
                  <CloseIcon />
                </div>
              </div>
              <div className="n-modal-main">
                <div className="n-modal-voting-area">
                  <input
                    value={votes}
                    type="number"
                    onChange={handleVotes}
                    onBlur={() => {
                      if (votes > initialVoteCount) {
                        setVotes(initialVoteCount);
                      } else if (votes < 0) {
                        setVotes(0);
                      }
                    }}
                  />
                  <p>Votes</p>
                </div>
              </div>
              <div className="n-modal-footer">
                <button type="button" onClick={handleModal}>
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!hasChanged || votes === 0}
                  onClick={handleVotesSubmit}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
