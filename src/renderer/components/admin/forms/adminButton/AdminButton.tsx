import "./index.scss";

interface IAdminButton {
  children: React.ReactNode;
  onClick: (e:any) => void;
  type?: "button" | "submit" | "reset";
  disable?: boolean;
}
export default function AdminButton({
  children,
  onClick,
  type,
  disable,
}: IAdminButton): JSX.Element {
  return (
    <span
      className={`ad-button ${
        type && type === "submit" ? "gradientBg" : "gradientBg3"
      } gradientBorder`}
    >
      <button
        type={type ?? "button"}
        disabled={disable ?? false}
        onClick={onClick}
      >
        {children}
      </button>
    </span>
  );
}
