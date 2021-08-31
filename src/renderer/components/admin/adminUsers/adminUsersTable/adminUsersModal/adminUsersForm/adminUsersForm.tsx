import "./index.scss";
import {
  AdminInput,
  AdminButton,
  AdminButtonArea,
  AdminRadioButton,
} from "../../../../forms/AdminFormCore";
import { useState, useCallback } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  SIGN_UP_ADMIN,
  UPDATE_ADMINN_USER,
  CHANGE_ADMIN_USER_PASSWORD,
} from "../../../../../../../graphql/mutations";
import useTypedReduxState from "../../../../../../hooks/useTypedReduxState";
import useDidUpdateEffect from "../../../../../../hooks/useDidUpdateEffect";
import { IAdminUser } from "../../../../../../api/types/AdminData";

interface IAdminForm {
  username: string;
  password: string;
  admin: boolean;
  newPassword: string;
}

export default function AdminUsersForm({
  closeModal,
  edit,
  data,
  index,
  passwordChange,
}: {
  closeModal: () => void;
  edit?: boolean;
  data?: IAdminUser;
  index?: number;
  passwordChange?: boolean;
}): JSX.Element {
  const initialState: IAdminForm = {
    username: data?.username ?? "",
    password: "",
    admin: data?.admin ?? false,
    newPassword: "",
  };
  const [adminForm, setAdminForm] = useState<IAdminForm>(initialState);

  const [submiting, setSubmiting] = useState(false);
  const [errmsg, setErrmsg] = useState("");

  const [{ adminUsers }, setAdminUser] = useTypedReduxState(
    (state) => state.globalData
  );
  const { username, password, admin, newPassword } = adminForm;

  const [addUser] = useMutation(SIGN_UP_ADMIN, {
    onCompleted: (e) => {
      const users = [...adminUsers.users];
      users.push(e.signupUser);
      setAdminUser({
        type: "SET_GLOBAL_DATA",
        arg: {
          adminUsers: {
            ...adminUsers,
            users: [...users],
          },
        },
      });
      closeModal();
      setSubmiting(false);
    },
    onError: (e) => {
      setErrmsg(e.message);
      setSubmiting(false);
    },
  });

  const [updateUser] = useMutation(UPDATE_ADMINN_USER, {
    onCompleted: (e) => {
      if (index) {
        const users = [...adminUsers.users];
        users[index] = e.updateUser;
        setAdminUser({
          type: "SET_GLOBAL_DATA",
          arg: {
            adminUsers: {
              ...adminUsers,
              users: [...users],
            },
          },
        });
        closeModal();
      }
    },
    onError: (e) => {
      setErrmsg(e.message);
      setSubmiting(false);
    },
  });
  const [changePassword] = useMutation(CHANGE_ADMIN_USER_PASSWORD, {
    onCompleted: () => {
      closeModal();
    },
    onError: (e) => {
      setErrmsg(e.message);
      setSubmiting(false);
    },
  });

  useDidUpdateEffect(() => {
    if (submiting) {
      if (username !== "") {
        if (!edit && !passwordChange) {
          if (password !== "") {
            addUser({
              variables: {
                username: username,
                password: password,
                admin: admin,
              },
            });
          }
        }
        if (edit && !passwordChange) {
          if (data) {
            console.log(data);
            console.log(
              JSON.stringify({
                id: data.id,
                admin: admin,
                username: username,
              })
            );
            updateUser({
              variables: {
                id: data.id,
                admin: admin,
                username: username,
              },
            });
          }
        }

        if (passwordChange && !edit) {
          if (data) {
            if (password !== "" && newPassword !== "") {
              changePassword({
                variables: {
                  id: data.id,
                  oldpassword: password,
                  password: newPassword,
                },
              });
            }
          }
        }
      }
    }
  }, [submiting]);

  const handleFormChange = useCallback(
    (item: Partial<IAdminForm>) => {
      setAdminForm({
        ...adminForm,
        ...item,
      });
    },
    [adminForm]
  );
  return (
    <form className="au-form">
      {!passwordChange && (
        <AdminInput
          label="username"
          value={username}
          onChange={(e) => handleFormChange({ username: e })}
        />
      )}
      {!edit && (
        <AdminInput
          type="password"
          label={passwordChange ? "Old Password" : "password"}
          value={password}
          onChange={(e) => handleFormChange({ password: e })}
        />
      )}
      {passwordChange && (
        <AdminInput
          type="password"
          label="New Password"
          value={newPassword}
          onChange={(e) => handleFormChange({ newPassword: e })}
        />
      )}
      {!passwordChange && (
        <AdminRadioButton
          label="Admin"
          checked={admin}
          onChange={() => handleFormChange({ admin: !admin })}
        />
      )}
      {errmsg !== "" && <p className="au-errmsg">{errmsg}</p>}
      <AdminButtonArea className="au-btn-area">
        <AdminButton onClick={closeModal}>Cancel</AdminButton>
        <AdminButton
          type="submit"
          onClick={() => setSubmiting(true)}
          disable={submiting || adminForm === initialState}
        >
          Create
        </AdminButton>
      </AdminButtonArea>
    </form>
  );
}
