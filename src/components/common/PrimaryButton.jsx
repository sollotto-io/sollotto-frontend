export default function PrimaryButton({ handleClick, children, className, style }) {
  return (
    <button
      type="button"
      onClick={handleClick}
      style={style ?? {}}
      className={`greenBtn globalBtn ${className}`}
    >
      {children}
    </button>
  );
}
