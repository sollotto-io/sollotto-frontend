import "./index.scss";

import { Modal } from "@material-ui/core";
import { INftForm } from "../../../../../api/types/globalData";
/* import PoolForm from "./poolForm/PoolForm"; */
import AdminNftForm from "./adminNftForm/AdminNftForm";

export default function AdminNftModal({
  open,
  onClose,
  edit,
  data,
  index,
}: {
  open: boolean;
  edit?: boolean;
  data?: INftForm;
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
          <h1>{edit ? "Edit Nft" : "Add Nft"}</h1>
        </div>
        <div className="p-modal-body">
          {edit ? (
            <AdminNftForm
              closeModal={onClose}
              edit={edit}
              data={data}
              index={index}
            />
          ) : (
            <AdminNftForm closeModal={onClose} />
          )}
        </div>
      </div>
    </Modal>
  );
}
