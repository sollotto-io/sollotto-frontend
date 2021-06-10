import React, { useContext } from "react";
import TranspInfo from "./purchase-components/TranspInfo";
import { withStyles } from "@material-ui/core/styles";
import Zoom from "@material-ui/core/Zoom";
import IconButton from "@material-ui/core/IconButton";
import AlarmIcon from "@material-ui/icons/Alarm";
import { GlobalContext } from "../../context/GlobalContext";
import Counter from "../common/countdown";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";
const TanspInfoToolTip = withStyles({
  tooltip: {
    background: "var(--tungsten)",
  },
  arrow: {
    color: "var(--tungsten)",
  },
})(Tooltip);

export default function HeaderInfo(props) {
  const { globalData } = useContext(GlobalContext);
  return (
    <>
      <div className="headerIcons">
        <TranspInfo />
        <TanspInfoToolTip
          id="tooltip"
          title={
            <div className="transpInfoToolTip">
              <div className="transpInfoToolTipBody">
              <span>The next lottery will be held on <br/>{moment(globalData.currentLottery.EndDate).format('LL')} at 12am UTC</span>
              </div>
            </div>
          }
          interactive
          arrow
          TransitionComponent={Zoom}
          placement="bottom-end"
          leaveTouchDelay={2000} enterTouchDelay={50}
        >
          <IconButton color="inherit" component="span">
            <AlarmIcon />
          </IconButton>
        </TanspInfoToolTip>
      </div>
      <div className="lotteryCountdown">
        <Counter time={globalData.currentLottery.EndDate} />
      </div>
    </>
  );
}
