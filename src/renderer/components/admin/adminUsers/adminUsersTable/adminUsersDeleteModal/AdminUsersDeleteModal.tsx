import "./index.scss";
import { Modal } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { AdminButtonArea, AdminButton } from "../../../forms/AdminFormCore";
import { DELETE_ADMIN_USER } from "../../../../../../graphql/mutations";
import useTypedReduxState from "../../../../../hooks/useTypedReduxState";

export default function AdminUsersDeleteModal({
  open,
  onClose,
  index,
  id,
}: {
  open: boolean;
  onClose: () => void;
  id?: string;
  index?: number;
}): JSX.Element {
  const [{ adminUsers }, setGlobalData] = useTypedReduxState(
    (state) => state.globalData
  );

  const [deleteUser] = useMutation(DELETE_ADMIN_USER, {
    onCompleted: () => {
      if (index) {
        const newUsers = [...adminUsers.users];
        newUsers.splice(index, 1);

        setGlobalData({
          type: "SET_GLOBAL_DATA",
          arg: {
            adminUsers: {
              ...adminUsers,
              users: newUsers,
            },
          },
        });
        onClose();
      }
    },
    onError: (e) => {
      console.log(e.message);
    },
  });
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
          <h1>Delete user</h1>
        </div>
        <div className="au-modal-body">
          <h3>Are you sure?</h3>
          <AdminButtonArea className="au-btn-area">
            <AdminButton onClick={onClose}>Cancel</AdminButton>
            <AdminButton
              type="submit"
              onClick={() => {
                if (id) {
                  deleteUser({
                    variables: {
                      id: id,
                    },
                  });
                }
              }}
            >
              Delete
            </AdminButton>
          </AdminButtonArea>
        </div>
      </div>
    </Modal>
  );
}
