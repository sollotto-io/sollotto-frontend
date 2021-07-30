import "./index.scss";
import { useState } from "react";
export default function AdminInput({
  label,
  inputStyle,
  labelStyle,
  error,
  errorMesage,
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
  label: string;
  inputStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  error?: boolean;
  errorMesage?: string;
  conpleted?: boolean;
}): JSX.Element {
  const [err, setErr] = useState(error ?? false);
  return (
    <div className="ad-input-w">
      <p className="ad-input-label" style={{ ...labelStyle } ?? {}}>
        {label}
      </p>
      <input
        {...(value !== undefined &&
          onChange !== undefined && {
            value: value,
            onChange: (e) => onChange(e.target.value),
          })}
        className="ad-input"
        style={{ ...inputStyle } ?? {}}
        onBlur={(e) => {
          if (e.target.value === "") {
            setErr(true);
          } else {
            setErr(false);
          }
        }}
      />
      {(error || err) && (
        <p className="ad-input-error">
          {errorMesage ?? "This field is necesary"}
        </p>
      )}
    </div>
  );
}
