import React,{useContext} from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Zoom from '@material-ui/core/Zoom';
import IconButton from '@material-ui/core/IconButton';
import AlarmIcon from '@material-ui/icons/Alarm';
import { LotteryContext } from '../../../context/LotteryContext';

const TanspInfoToolTip = withStyles({
  tooltip: {
    background: 'var(--tungsten)',
  },
  arrow: {
    color: 'var(--tungsten)',
  },
})(Tooltip);

export default function LotteryEndInfo() {
  const { lotteryData } = useContext(LotteryContext);

  return (
    <TanspInfoToolTip
          id="tooltip"
          title={
            <div className="transpInfoToolTip">
              <div className="transpInfoToolTipBody">
                <span>
                  The next lottery will be held on <br />
                  {moment(lotteryData.currentLottery.EndDate).format('LL')} at 12am UTC
                </span>
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
  )
}
