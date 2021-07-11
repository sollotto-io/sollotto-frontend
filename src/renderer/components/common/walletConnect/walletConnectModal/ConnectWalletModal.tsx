import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import ConnectWalletModalListItem from "./connectWalletModalListItem/ConnectWalletModalListItem";
import CloseIcon from "@material-ui/icons/Close";
import "./index.scss";

export default function ConnectWalletModal({
  handleClose,
  open,
}: {
  handleClose: () => void;
  open: boolean;
}): JSX.Element {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className="connectModal"
    >
      <Fade in={open}>
        <div className="connectModalItem">
          <div className="modalTitle">
            Connect to a Wallet{" "}
            <CloseIcon style={{ cursor: "pointer" }} onClick={handleClose} />
          </div>
          <ul className="modalList">
            <ConnectWalletModalListItem
              handleClose={handleClose}
              name="Sollet"
            />
            <ConnectWalletModalListItem
              handleClose={handleClose}
              name="Phantom"
            />
          </ul>
        </div>
      </Fade>
    </Modal>
  );
}
