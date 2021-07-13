import "./index.scss";

export default function Paragraph({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}): JSX.Element {
  return (
    <div
      className={`sol-paragraph ${className ? className : ""}`}
      style={style ? style : {}}
    >
      {children}
    </div>
  );
}
