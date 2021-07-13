import "./index.scss";
export default function PrimaryButton({
  onClick,
  children,
  className,
  style,
  disabled,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      style={style ?? {}}
      className={`greenBtn globalBtn ${className}`}
      disabled={disabled ?? false}
    >
      {children}
    </button>
  );
}
