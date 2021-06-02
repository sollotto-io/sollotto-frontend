import React from "react";
import { Link } from "react-router-dom";
import "../css/footer.css";
import logo from "../images/logos/Sollotto-Logo-Horizontal-Colored.png";
import TwitterIcon from "@material-ui/icons/Twitter";
import TelegramIcon from "@material-ui/icons/Telegram";
const Footer = () => {
  return (
    <div id="footerSection">
      <div id="logo">
        <img src={logo} width="auto" height="40px" alt="logo" />
      </div>
     
      <div id="web-links">
        <Link to="/">Home</Link>
        <Link to="/purchase">App</Link>
        <Link to="/">Info</Link>
      </div>
      <div id="social-links">
        <TwitterIcon fontSize={"small"} />
        <TelegramIcon fontSize={"small"} />
        <span
          className="iconify"
          data-icon="mdi-discord"
          data-inline="false"
        ></span>
      </div>
     
    </div>
  );
};

export default Footer;
