import "./index.scss";
import { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import navList from "../nav-items.json";
import SollotoLogoH from "../../../../assets/images/logos/SolLotto-logo-horizontal.png";
import WalletConnect from "../../common/walletConnect/WallectConnect";
import WalletBalance from "../walletBalance/WalletBalance";
import { useLocation } from "react-router";
import useReduxState from "../../../hooks/useReduxState";
import WalletDisconnect from "../../common/walletDisconnect/WalletDisconnect";
import { useHistory } from "react-router";

export default function DesktopNav(): JSX.Element {
  const { pathname } = useLocation();
  const [{ walletConnectedFlag }] = useReduxState((state) => state.globalData);
  const history = useHistory();
  const backToHome = () => {
    history.push("/purchase");
  };
  return (
    <nav style={{ marginBottom: "60px" }}>
      <AppBar position="fixed" className="desktop-app-bar app-bar">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={backToHome}
          >
            <img className="d-appbar-icon" src={SollotoLogoH} />
          </IconButton>
          <div className="d-navigation-list">
            {navList.map(
              (navItem: { name: string; link: string }, index: number) => (
                <Link
                  className={`desktop-nav-item ${
                    pathname === navItem.link && "selected-item"
                  }`}
                  key={index}
                  to={navItem.link}
                >
                  {navItem.name}
                </Link>
              )
            )}
          </div>
          <div className="m-nav-actions">
            <WalletBalance />
            <WalletConnect />
            {walletConnectedFlag && (
              <WalletDisconnect style={{ width: "25px", marginLeft: "15px" }} />
            )}
          </div>
        </Toolbar>
      </AppBar>
    </nav>
  );
}
