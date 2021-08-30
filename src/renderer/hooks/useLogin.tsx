import { useMutation } from "@apollo/react-hooks";
import { LOGIN_ADMIN } from "../../graphql/mutations";
import useTypedReduxState from "./useTypedReduxState";

export default function useLogin(): [
  ({ username, password }: { username: string; password: string }) => boolean
] {
  const [, setAdminData] = useTypedReduxState((state) => state.adminData);
  const [login] = useMutation(LOGIN_ADMIN, {
    onCompleted: (e) => {
      console.log(e);
      setAdminData({
        type: "SET_ADMIN_DATA",
        arg: {
          authenticated: true,
          username: e.loginUser.username,
          error: "",
          authErr: false,
          admin: e.loginUser.admin,
        },
      });
      localStorage.setItem("token", e.loginUser.token);
    },
    onError: (e) => {
      setAdminData({
        type: "SET_ADMIN_DATA",
        arg: {
          error: e.message,
        },
      });
    },
  });

  const initLogin = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): boolean => {
    if (password === "" || username === "") {
      return false;
    }
    (async () => {
      await login({
        variables: {
          username,
          password,
        },
      });
    })();
    return true;
  };
  return [initLogin];
}
