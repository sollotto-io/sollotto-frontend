import "./index.scss";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import React from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

export default function AdminDatePicker({
  value,
  onChange,
  style,
  error,
}: {
  value: string;
  onChange: (e: string) => void;
  style?: React.CSSProperties;
  error?: boolean;
}): JSX.Element {
  return (
    <div className="ad-datepicker">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          value={new Date(value)}
          onChange={(e) => {
            if (e) onChange(e?.toDateString() + " GMT-8");
          }}
          style={style ?? {}}
        />
      </MuiPickersUtilsProvider>
      {error && <p className="ad-dp-error">Please select a date</p>}
    </div>
  );
}
