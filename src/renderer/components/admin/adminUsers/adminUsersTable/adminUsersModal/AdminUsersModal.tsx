import "./index.scss";
import { Modal } from "@material-ui/core";
import AdminUsersForm from "./adminUsersForm/adminUsersForm";
import { IAdminUser } from "../../../../../api/types/AdminData";
export default function AdminUsersModal({
  open,
  edit,
  onClose,
  index,
  data,
  passwordChange,
}: {
  open: boolean;
  edit: boolean;
  onClose: () => void;
  data?: IAdminUser;
  index?: number;
  passwordChange?: boolean;
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
          {edit && !passwordChange && (
            <AdminUsersForm
              closeModal={onClose}
              edit={edit}
              index={index}
              data={data}
            />
          )}
          {passwordChange && (
            <AdminUsersForm
              closeModal={onClose}
              index={index}
              data={data}
              passwordChange={passwordChange}
            />
          )}

          {!edit && !passwordChange && <AdminUsersForm closeModal={onClose} />}
        </div>
      </div>
    </Modal>
  );
}
