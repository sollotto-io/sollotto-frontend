import "./index.scss";
import {
  AdminInput,
  AdminButton,
  AdminButtonArea,
  AdminRadioButton,
} from "../../../../forms/AdminFormCore";
import { useState, useCallback } from "react";
import { useMutation } from "@apollo/react-hooks";
import { SIGN_UP_ADMIN } from "../../../../../../../graphql/mutations";
import useTypedReduxState from "../../../../../../hooks/useTypedReduxState";
import useDidUpdateEffect from "../../../../../../hooks/useDidUpdateEffect";

interface IAdminForm {
  username: string;
  password: string;
  admin: boolean;
}

export default function AdminUsersForm({
  closeModal,
}: {
  closeModal: () => void;
}): JSX.Element {
  const initialState: IAdminForm = {
    username: "",
    password: "",
    admin: false,
  };
  const [adminForm, setAdminForm] = useState<IAdminForm>(initialState);

  const [submiting, setSubmiting] = useState(false);

  const [{ adminUsers }, setAdminUser] = useTypedReduxState(
    (state) => state.globalData
  );
  const [addUser] = useMutation(SIGN_UP_ADMIN, {
    onCompleted: (e) => {
      const users = [...adminUsers.users];
      users.push(e.signupUser);
      console.log(users);
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
    },
  });

  useDidUpdateEffect(() => {
    if (adminForm !== initialState) {
      addUser({
        variables: {
          username: username,
          password: password,
          admin: admin,
        },
      });
    }
  }, [submiting]);

  const { username, password, admin } = adminForm;
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
      <AdminInput
        label="username"
        value={username}
        onChange={(e) => handleFormChange({ username: e })}
      />
      <AdminInput
        type="password"
        label="password"
        value={password}
        onChange={(e) => handleFormChange({ password: e })}
      />
      <AdminRadioButton
        label="Admin"
        checked={admin}
        onChange={() => handleFormChange({ admin: !admin })}
      />
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
