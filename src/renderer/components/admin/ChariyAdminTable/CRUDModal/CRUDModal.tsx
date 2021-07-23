import { Modal } from "@material-ui/core";
import AddEditForm from "./AddEditForm/AddEditForm";
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
    
    
        <Modal
          open={modalState}
          onClose={handleModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="n-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className= "charityCrudWrapper gradientBg gradientBorder">
            <div className="ad-modal-header">
              <h4>{modalType ? "Add Charity": "Edit Charity"}</h4>
            </div>
            <div className="ad-modal-body">
            <AddEditForm id={id} modalType ={modalType} handleModalClose = {handleModalClose}/>
           </div>
          </div>
        </Modal>
     
  );
}
