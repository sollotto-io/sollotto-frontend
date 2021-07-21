import { Tooltip } from "@material-ui/core";
import React from "react";

export default function IconButton({
  icon,
  tooltip,
  onClick,
  className,
  style,
}: {
  icon: string;
  tooltip: string;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}): JSX.Element {
  return (
    <Tooltip title={tooltip}>
      <img
        onClick={onClick}
        src={icon}
        className={className ?? ""}
        alt="hi"
        style={style ?? {}}
      />
    </Tooltip>
  );
}
