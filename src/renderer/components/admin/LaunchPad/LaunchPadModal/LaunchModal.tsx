import "./index.scss";
import { Modal } from "@material-ui/core";
import LaunchForm from "./LaunchForm/LaunchForm"
export default function LaunchModal({
  open,
  onClose,
  edit,
  id
}: {
  open: boolean;
  edit?: boolean;
  onClose: () => void;
  id:string
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
          <h1>{edit ? "Edit LaunchPad Lottery" : "Add LaunchPad Lottery"}</h1>
        </div>
        <div className="r-modal-body">
         
            {edit ? (
              <LaunchForm closeModal={onClose} edit={edit} id={id} />
            ) : (
              <LaunchForm closeModal={onClose}  />
            )}
         
        </div>
      </div>
    </Modal>
  );
}
