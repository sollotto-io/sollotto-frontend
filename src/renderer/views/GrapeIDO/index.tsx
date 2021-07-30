import IDOCard from "./components/IDOCard";
import Grape from "../../../assets/images/svg/grape_logo.svg";
import Parrot from "../../../assets/images/pictures/parrot (1).png";
import Sollotto from "../../../assets/images/pictures/sollotto.gif";
import "./index.scss";
import { Link } from "react-router-dom";
import { CSVReader } from "react-papaparse";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/stores/store";

function GrapeIDO(): JSX.Element {
  const { ticketNumberArr } = useSelector(
    (state: AppState) => state.purchaseData
  );
  const [csvInput, setCsvInput] = useState<any>([]);
  const [isSelectionOver, setSelection] = useState<boolean>(false);
  useEffect(() => {
    console.log(ticketNumberArr);
  }, [isSelectionOver]);
  return (
    <div className="pageWrapperIDO">
      <div id="purchaseSection">
        <div className="pageHeaderIDO">
          <img src={Grape} height="50px" alt="" />
          <img src={Parrot} height="50px" alt="" />
        </div>
        <p>
          Powered By <img src={Sollotto} height="30px" alt="" /> SolLotto
        </p>
        <IDOCard
          setCsvInput={setCsvInput}
          csvInput={csvInput}
          setSelection={setSelection}
        />
        <span style={{ opacity: 0.7, marginTop: 10, color: "gray" }}>
          Verify only one set of numbers has been chosen by visiting: <br />
          <Link
            style={{ marginTop: 10, color: "gray" }}
            to={"/grape-parrot-verify"}
            target="_blank"
          >
            app.sollotto.io/grape-parrot-verify
          </Link>
        </span>

        {csvInput.length > 0 && isSelectionOver === true ? (
          <div className="csv-list">
            <h4>List of Participants</h4>

            {csvInput.map(
              (
                e: any,
                i: number
              ) /* eslint-disable @typescript-eslint/no-explicit-any*/ => {
                return (
                  <span
                    style={{ display: "flex", flexDirection: "row" }}
                    key={i}
                  >
                    {ticketNumberArr.includes(i + 1) ? (
                      <p
                        style={{
                          backgroundColor: "yellow",
                          color: "black",
                          width: "fit-content",
                          marginBottom: 5,
                        }}
                      >
                        {e}
                      </p>
                    ) : (
                      <p style={{ marginBottom: 5 }}>{e}</p>
                    )}
                  </span>
                );
              }
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default GrapeIDO;
