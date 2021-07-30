import "./index.scss";
import { Select, MenuItem } from "@material-ui/core";

interface IAdminSelect {
  value: string | number;
  onChange: (value: string | number) => void;
  itemList: { name: string; value: string | number }[];
  placeholder?: string;
  label?: string;
  className?: string;
  error?: boolean;
  errorMessage?: boolean;
}

export default function AdminSelect({
  value,
  onChange,
  itemList,
  placeholder,
  label,
  className,
  error,
  errorMessage,
}: IAdminSelect): JSX.Element {
  return (
    <div className="ad-select">
      {label && <p>{label}</p>}
      <Select
        labelId="demo-simple-select-placeholder-label-label"
        id="demo-simple-select-placeholder-label"
        value={value}
        onChange={(e) => onChange(e.target.value as typeof value)}
        displayEmpty
        className={className ?? ""}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            <em>{placeholder}</em>
          </MenuItem>
        )}

        {itemList.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      {error && (
        <p className="ad-select-error">
          {errorMessage ?? "This field is necesary"}
        </p>
      )}
    </div>
  );
}
