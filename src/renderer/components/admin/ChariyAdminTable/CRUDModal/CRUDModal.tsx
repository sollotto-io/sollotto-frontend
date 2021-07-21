import { Modal } from "@material-ui/core";
import "./CRUDModal.scss";

interface IModalState {
  modalState: boolean;
  modalType: boolean;
  handleModalClose: () => void;
  id: string;
}

export default function CRUDModal({
  modalState,
  modalType,
  handleModalClose,
  id,
}: IModalState): JSX.Element {
  return (
    <div>
      <div>
        <Modal
          open={modalState}
          onClose={handleModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="n-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <>
           {modalType ? "ADD" : id }
          </>
        </Modal>
      </div>
    </div>
  );
}
