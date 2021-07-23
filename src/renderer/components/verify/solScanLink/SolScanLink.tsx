import "./index.scss";
import PrimaryButton from "../../common/primaryButton/PrimaryButton";

export default function SolScanLink(): JSX.Element {
  return (
    <PrimaryButton
      className="sol-scan-link"
      onClick={() => {
        window.open("https://solanascan.io/", "_blank")?.focus();
      }}
    >
      SolScan
    </PrimaryButton>
  );
}
