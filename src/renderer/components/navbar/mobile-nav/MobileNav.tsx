import "./index.scss";
import { useState } from "react";
import { Drawer } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import navList from "../nav-items.json";
import SollotoLogo from "../../../../assets/images/logos/Sollotto-Icon-Transparent.png";
import SollotoLogoH from "../../../../assets/images/logos/SolLotto-logo-horizontal.png";
import WalletConnect from "../../common/walletConnect/WallectConnect";
import WalletBalance from "../walletBalance/WalletBalance";
import { useLocation } from "react-router";
import useReduxState from "../../../hooks/useReduxState";
import WalletDisconnect from "../../common/walletDisconnect/WalletDisconnect";
import DevnetButton from "../devnet-Button/DevnetButton";

export default function MobileNav(): JSX.Element {
  const { pathname } = useLocation();
  const [drawer, setDrawer] = useState<boolean>(false);
  const [{ walletConnectedFlag }] = useReduxState((state) => state.globalData);
  const handleDrawerOpen = () => {
    setDrawer(!drawer);
  };
  return (
    <nav style={{ marginBottom: "35px" }}>
      <AppBar position="fixed" className="app-bar">
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start">
            <img className="m-appbar-icon" src={SollotoLogoH} />
            <DevnetButton />
          </IconButton>
          <div className="m-nav-actions">
            <WalletBalance />
            <WalletConnect />
            <IconButton color="inherit" aria-label="open drawer" edge="end">
              <MenuIcon onClick={handleDrawerOpen} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawer}
        className="nav-drawer"
        onClose={handleDrawerOpen}
      >
        <img
          className={`mobile-nav-logo ${drawer ? "spin" : "reverse-spin"}`}
          src={SollotoLogo}
        />

        <div className="mobile-nav-item-list">
          {navList.map(
            (navItem: { name: string; link: string }, index: number) => {
              return (
                <Link
                  className={`mobile-nav-item ${
                    pathname === navItem.link && "selected-item"
                  }`}
                  key={index}
                  to={navItem.link}
                >
                  {navItem.name}
                </Link>
              );
            }
          )}
          {walletConnectedFlag && (
            <>
              <WalletDisconnect
                style={{ width: "40px", marginLeft: "-10px" }}
              />
              <p style={{ color: "white", fontSize: "15px" }}>Logout</p>
            </>
          )}
        </div>
      </Drawer>
    </nav>
  );
}
