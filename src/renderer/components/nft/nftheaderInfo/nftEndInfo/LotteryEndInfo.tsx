import "./index.scss";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import Zoom from "@material-ui/core/Zoom";
import IconButton from "@material-ui/core/IconButton";
import AlarmIcon from "@material-ui/icons/Alarm";
import useReduxState from "../../../../hooks/useTypedReduxState";

const TanspInfoToolTip = withStyles({
  tooltip: {
    background: "var(--tungsten)",
  },
  arrow: {
    color: "var(--tungsten)",
  },
})(Tooltip);

export default function LotteryEndInfo(): JSX.Element {
  const [
    {
      nfts: { nfts },
    },
  ] = useReduxState((state) => state.globalData);
  const currentNft = nfts.filter((n) => n.status === "live")[0];

  return (
    <TanspInfoToolTip
      id="tooltip"
      title={
        <div className="transpInfoToolTip">
          <div className="transpInfoToolTipBody">
            {!currentNft ? (
              <span>Please wait until the next lottery starts</span>
            ) : (
              <span>
                The winners will be picked on <br />
                {moment(currentNft.endDate).format("LL")} at 12am UTC
              </span>
            )}
          </div>
        </div>
      }
      interactive
      arrow
      TransitionComponent={Zoom}
      placement="bottom-end"
      leaveTouchDelay={2000}
      enterTouchDelay={50}
    >
      <IconButton color="inherit" component="span">
        <AlarmIcon />
      </IconButton>
    </TanspInfoToolTip>
  );
}
