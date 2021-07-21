import "./index.scss";
import useReduxState from "../../../../../../hooks/useReduxState";

export default function NumberInput({
  ticketPos,
  validateNum,
  setTicketNumber,
}: {
  ticketPos: number;
  validateNum: (vn: number) => void;
  setTicketNumber: (st: number) => void;
}): JSX.Element {
  const [{ ticketNumberArr }] = useReduxState((state) => state.purchaseData);

  return (
    <div
      className={
        ticketPos === 5
          ? "gradientBg3 gradientBorder numberInputWrapper"
          : "gradientBg2 gradientBorder numberInputWrapper"
      }
    >
      <input
        type="number"
        id={`ticketNumber${ticketPos}`}
        value={ticketNumberArr[ticketPos] ?? ""}
        className="numberSelectorInput"
        name={`ticketNumber${ticketPos}`}
        max={ticketPos >= 0 && ticketPos <= 4 ? 49 : 26}
        min="1"
        onBlur={(event) => {
          if (ticketPos >= 0 && ticketPos <= 4) {
            setTicketNumber(
              Math.min(Math.max(parseInt(event.target.value), 1), 49)
            );
          } else {
            setTicketNumber(
              Math.min(Math.max(parseInt(event.target.value), 1), 26)
            );
          }
        }}
        onChange={(event) => validateNum(parseInt(event.target.value))}
        placeholder="#"
      />
    </div>
  );
}
