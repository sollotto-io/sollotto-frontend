import "./index.scss";
import Switch from "@material-ui/core/Switch";

interface IAdminRadioButton {
  checked?: boolean;
  onChange?: () => void;
  label?: string;
}

export default function AdminRadioButton({
  checked,
  onChange,
  label,
}: IAdminRadioButton): JSX.Element {
  return (
    <div className="ad-radio">
      {label && <p>{label}</p>}
      <Switch {...(checked !== null && onChange && { checked, onChange })} />
    </div>
  );
}
