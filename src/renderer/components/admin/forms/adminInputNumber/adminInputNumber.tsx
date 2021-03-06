import "../adminInput/index.scss";
import { useState } from "react";
export default function AdminInputNumber({
  label,
  inputStyle,
  labelStyle,
  error,
  errorMesage,
  value,
  onChange,
}: {
  value?: number;
  onChange?: (value: number) => void;
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
            onChange: (e) => onChange(parseFloat(e.target.value)),
          })}
        type="number"
        className="ad-input"
        style={{ ...inputStyle } ?? {}}
        onBlur={(e) => {
          if (e.target.value === "") {
            setErr(true);
          } else {
            setErr(false);
          }
          if (parseInt(e.target.value) < 0) {
            e.target.value = "0";
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
