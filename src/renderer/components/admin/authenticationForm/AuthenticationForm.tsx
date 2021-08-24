import "./index.scss";

import SollotoLogo from "../../../../assets/images/logos/Sollotto-Icon-Transparent.png";
import { AdminInput, AdminButton } from "../forms/AdminFormCore";

export default function AuthenticationForm(): JSX.Element {
  return (
    <div className="auth-form-wrap">
      <div className="gradientBg gradientBorder">
        <div className="auth-form">
          <img src={SollotoLogo} alt="logo" />
          <h1>Solloto Admin</h1>
          <form>
            <AdminInput label="Username" />
            <AdminInput label="Passoword" />
            <AdminButton type="submit" onClick={() => console.log("hola")}>
              Login
            </AdminButton>
          </form>
        </div>
      </div>
    </div>
  );
}
