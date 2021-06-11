import React from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import ConnectWalletModalListItem from './ConnectWalletModalListItem';
import CloseIcon from '@material-ui/icons/Close';

export default function ConnectWalletModal(props) {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className="connectModal"
    >
      <Fade in={props.open}>
        <div className="connectModalItem">
          <div className="modalTitle">
            Connect to a Wallet{' '}
            <CloseIcon style={{ cursor: 'pointer' }} onClick={props.handleClose} />
          </div>
          <ul className="modalList">
            <ConnectWalletModalListItem name="Sollet" />
          </ul>
        </div>
      </Fade>
    </Modal>
  );
}
