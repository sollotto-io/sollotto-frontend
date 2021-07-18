import "./index.scss";
import SingleNumberSelector from "./singleNumberSelector/SingleNumberSelector";



export default function NumberSelectorIDO(): JSX.Element {
  return (
    <div className="numberSelector">
      {[0, 1, 2, 3, 4].map((ticketPos) => (
        <SingleNumberSelector ticketPos={ticketPos} key={ticketPos} />
      ))}
    </div>
  );
}
