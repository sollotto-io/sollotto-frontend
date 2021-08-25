import "./index.scss";

import SollotoLogo from "../../../../assets/images/logos/Sollotto-Icon-Transparent.png";
import { AdminInput, AdminButton } from "../forms/AdminFormCore";
import useLogin from "../../../hooks/useLogin";
import { useState } from "react";
import useTypedReduxState from "../../../hooks/useTypedReduxState";

export default function AuthenticationForm(): JSX.Element {
  const [login] = useLogin();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [{ error }] = useTypedReduxState((state) => state.adminData);
  const handleLogin = (e: any) => {
    e.preventDefault();
    login({
      username,
      password,
    });
  };
  return (
    <div className="auth-form-wrap">
      <div className="gradientBg gradientBorder">
        <div className="auth-form">
          <img src={SollotoLogo} alt="logo" />
          <h1>Solloto Admin</h1>
          <form>
            <AdminInput
              label="Username"
              value={username}
              onChange={(u) => setUserName(u)}
            />
            <AdminInput
              label="Password"
              value={password}
              onChange={(u) => setPassword(u)}
              type="password"
            />
            <AdminButton type="submit" onClick={(e) => handleLogin(e)}>
              Login
            </AdminButton>
          </form>
          {error && error !== "" && <p className="err-msg">{error}</p>}
        </div>
      </div>
    </div>
  );
}
