import "./index.scss";
export default function PurpleGradientSvg(): JSX.Element {
  return (
    <svg
      style={{ width: "0", height: "0", position: "absolute" }}
      aria-hidden="true"
      focusable="false"
    >
      <linearGradient id="purpleGradient" x1="0%" y1="10%" x2="100%" y2="90%">
        <stop offset="30%" stopColor="#c200fb" stopOpacity="1" />
        <stop offset="90%" stopColor="#9300bf" stopOpacity="1" />
      </linearGradient>
    </svg>
  );
}
