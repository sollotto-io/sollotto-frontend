import "./index.scss";
import CharitySelectorGrid from "./charitySelectorGrid/CharitySelectorGrid";

export default function CharitySelector(): JSX.Element {
  return (
    <div className="charitySelector">
      <span>Vote For Your Charity Of Choice:</span>
      <CharitySelectorGrid />
    </div>
  );
}
