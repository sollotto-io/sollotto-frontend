import "./index.scss";
import { Modal } from "@material-ui/core";
import AdminUsersForm from "./adminUsersForm/adminUsersForm";
export default function AdminUsersModal({
  open,
  edit,
  onClose,
}: {
  open: boolean;
  edit: boolean;
  onClose: () => void;
}): JSX.Element {
  return (
    <Modal
      open={open}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      onClose={onClose}
      className="au-modal-w"
    >
      <div className="au-modal  gradientBg gradientBorder">
        <div className="au-modal-header">
          <h1>{edit ? "Edit Admin User" : "Add Admin User"}</h1>
        </div>
        <div className="au-modal-body">
          {edit ? (
            <AdminUsersForm closeModal={onClose} />
          ) : (
            <AdminUsersForm closeModal={onClose} />
          )}
        </div>
      </div>
    </Modal>
  );
}
