import "./index.scss";
import { Modal } from "@material-ui/core";
import RaffleForm from "./raffleForm/RaffleForm";
export default function RaffleModal({
  open,
  onClose,
  edit,
}: {
  open: boolean;
  edit?: boolean;
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
          <form>
            {edit ? (
              <RaffleForm closeModal={onClose} edit={edit} />
            ) : (
              <RaffleForm closeModal={onClose} />
            )}
          </form>
        </div>
      </div>
    </Modal>
  );
}
