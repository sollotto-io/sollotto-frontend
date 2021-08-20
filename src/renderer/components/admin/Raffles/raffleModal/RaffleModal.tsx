import "./index.scss";
import { Modal } from "@material-ui/core";
import RaffleForm from "./raffleForm/RaffleForm";

export default function RaffleModal({
  open,
  onClose,
  id, 
  edit,
}: {
  open: boolean;
  edit?: boolean;
  id:string,
  onClose: () => void;
}): JSX.Element {

  return (
    <Modal
      open={open}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      onClose={onClose}
      className="r-modal-w"
    >
      <div className="r-modal gradientBg gradientBorder">
        <div className="r-modal-header">
          <h1>{edit ? "Edit Raffle" : "Add Raffle"}</h1>
        </div>
        <div className="r-modal-body">
          
            {edit ? (
              <RaffleForm closeModal={onClose} edit={edit} id={id} />
            ) : (
              <RaffleForm closeModal={onClose} id={id} />
            )}
          
        </div>
      </div>
    </Modal>
  );
}
