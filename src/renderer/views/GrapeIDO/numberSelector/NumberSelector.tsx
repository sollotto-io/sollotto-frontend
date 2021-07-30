import { useState } from "react";
import { useEffect } from "react";
import "./index.scss";
import SingleNumberSelector from "./singleNumberSelector/SingleNumberSelector";

export default function NumberSelectorIDO({
  winners,
}: {
  winners: number;
}): JSX.Element {
  const [arr, setArr] = useState<number[]>([0,1,2,3,4,5]);
  useEffect(() => {
    const tempArr = [];
    if (winners > 0) {
      for (let index = 0; index < winners; index++) {
        tempArr[index] = index;
      }
      setArr(tempArr);
    }
  }, [winners]);

  return (
    <div className="numberSelectorIDO">
      {arr.map((ticketPos) => (
        <SingleNumberSelector ticketPos={ticketPos} key={ticketPos} />
      ))}
    </div>
  );
}
