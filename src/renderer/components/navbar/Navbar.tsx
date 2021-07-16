import "./index.scss";
import { useMediaQuery } from "react-responsive";
import MobileNav from "./mobile-nav/MobileNav";
import DesktopNav from "./desktop-nav/DesktopNav";

export default function Navbar(): JSX.Element {
  const desktop = useMediaQuery({
    query: "(min-width: 992px)",
  });

  return desktop ? <DesktopNav /> : <MobileNav />;
}
