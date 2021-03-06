import "./index.scss";
import { Link } from "react-router-dom";
import TwitterIcon from "@material-ui/icons/Twitter";
import TelegramIcon from "@material-ui/icons/Telegram";
import logo from "../../../assets/images/logos/SolLotto-logo-horizontal.png";

const Footer = (): JSX.Element => (
  <div id="footerSection">
    <div id="logo">
      <a href="/purchase">
        <img src={logo} width="auto" height="40px" alt="logo" />
      </a>
    </div>
    <div id="web-links">
      <a href="/purchase">Home</a>
      <Link to="/purchase">App</Link>
      <a href="https://sollotto.io/about">Info</a>
    </div>
    <div id="social-links">
      <a href="https://twitter.com/TeamSolLotto">
        <TwitterIcon fontSize="small" />
      </a>
      <a href="https://t.me/joinchat/Dj3oGbIKRlA5M2Fh">
        <TelegramIcon fontSize="small" />
      </a>
      <a href="https://discord.gg/SolLotto">
        <span className="iconify" data-icon="mdi-discord" data-inline="false" />
      </a>
    </div>
  </div>
);

export default Footer;
