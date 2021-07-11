import React from "react";
import "./index.scss";

export default function PageTitle({
  title,
  className,
  style,
}: {
  title: string;
  className?: string;
  style?: React.CSSProperties;
}): JSX.Element {
  return (
    <h3 style={style ?? {}} className={`pageTitle ${className ?? ""}`}>
      {title}
    </h3>
  );
}
