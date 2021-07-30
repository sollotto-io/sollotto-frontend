import "./index.scss";
import AdminButton from "../adminButton/AdminButton";
import { ReactElement } from "react";

export default function ButtonArea({
  children,
  className,
}: {
  children:
    | Array<ReactElement<typeof AdminButton>>
    | ReactElement<typeof AdminButton>;
  className?: string;
}): JSX.Element {
  return <div className={`ad-btn-area ${className ?? ""}`}>{children}</div>;
}
