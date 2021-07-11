import "./index.scss";
import logo from "../../../../../../../../assets/images/logos/Sollotto-Icon-Transparent.png";
export default function SolLottoLogo({
  selected,
  charitySelectorIcon,
}: {
  selected: boolean;
  charitySelectorIcon: boolean;
}): JSX.Element {
  return (
    <img
      className={`${
        charitySelectorIcon
          ? `charitySelectorIcon iconLogo ${selected ? "blockDisplay" : ""}`
          : "iconLogo"
      }`}
      src={logo}
      alt="logo"
    />
  );
}
