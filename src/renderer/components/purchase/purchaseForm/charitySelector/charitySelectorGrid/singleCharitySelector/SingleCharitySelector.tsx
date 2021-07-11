import "./index.scss";
import { useRef, useState, useEffect, useCallback } from "react";
import CharityImage from "./charityImage/CharityImae";
import CharityName from "./charityName/charityName";
import SolLottoLogo from "./sollotoLogo/SollotoLogo";
import { IconButton } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { Link } from "react-router-dom";

import useReduxState from "../../../../../../hooks/useReduxState";

interface ISingleCharitySelector {
  charityId: string;
  index: number;
  key: number | string;
  charitySelectHandler: (charity: string) => void;
}

export default function SingleCharitySelector({
  charityId,
  index,
  charitySelectHandler,
}: ISingleCharitySelector): JSX.Element {
  const [lotteryState] = useReduxState((state) => state.lotteryData);
  const [{ selectedCharity }] = useReduxState((state) => state.purchaseData);
  const { lotteryData } = lotteryState;
  const singleCharityBlockRef = useRef(null);

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (selected) charitySelectHandler(charityId);
  }, [selected]);

  useEffect(() => {
    setSelected(selectedCharity === charityId);
  }, [selectedCharity]);

  const handleSelection = useCallback(() => {
    setSelected(!selected);
  }, [selected]);

  return (
    <div
      className={`${
        selected ? "gradientBg" : "psuedoGreyBg"
      } psuedoBorder  singleCharitySelectorWrapper`}
      ref={singleCharityBlockRef}
      onClick={handleSelection}
      style={{ cursor: "pointer" }}
    >
      <div className="singleCharitySelector">
        <Link
          style={{ position: "absolute", right: "5px" }}
          to={{
            pathname: `/charities/${lotteryData.Charities[index].charityName}`,
            state: { fromPurchase: true },
          }}
        >
          <IconButton id="info-circle">
            <InfoIcon style={{ fill: "#fff" }} />
          </IconButton>
        </Link>

        <CharityImage charityId={lotteryData.Charities[index].charityName} />
        <CharityName charityIndex={index} />
        <SolLottoLogo selected={selected} charitySelectorIcon={true} />
      </div>
    </div>
  );
}
