import "./index.scss";
import { Modal } from "@material-ui/core";
import LaunchForm from "./LaunchForm/LaunchForm"
export default function LaunchModal({
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
              <LaunchForm closeModal={onClose} edit={edit} />
            ) : (
              <LaunchForm closeModal={onClose} />
            )}
          </form>
        </div>
      </div>
    </Modal>
  );
}
