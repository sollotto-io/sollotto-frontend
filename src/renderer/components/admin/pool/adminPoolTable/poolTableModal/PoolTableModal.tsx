import "./index.scss";
import { Modal } from "@material-ui/core";
import { IPoolForm } from "../../../../../api/types/globalData";
import PoolForm from "./poolForm/PoolForm";

export default function PoolTableModal({
  open,
  onClose,
  edit,
  data,
  index,
}: {
  open: boolean;
  edit?: boolean;
  data?: IPoolForm;
  index?: number;
  onClose: () => void;
}): JSX.Element {
  return (
    <Modal
      open={open}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      onClose={onClose}
      className="p-modal-w"
    >
      <div className="p-modal gradientBg gradientBorder">
        <div className="p-modal-header">
          <h1>{edit ? "Edit Pool" : "Add Pool"}</h1>
        </div>
        <div className="p-modal-body">
          {edit ? (
            <PoolForm
              closeModal={onClose}
              edit={edit}
              data={data}
              index={index}
            />
          ) : (
            <PoolForm closeModal={onClose} />
          )}
        </div>
      </div>
    </Modal>
  );
}
