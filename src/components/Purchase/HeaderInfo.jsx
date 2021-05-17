import React from "react";
import TranspInfo from "./purchase-components/TranspInfo";
import IconButton from "@material-ui/core/IconButton";
import AlarmIcon from "@material-ui/icons/Alarm";
export default function HeaderInfo(props) {
	return (
		<>
			<div className='headerIcons'>
				<TranspInfo />
				<IconButton color='inherit' component='span'>
					<AlarmIcon />
				</IconButton>
			</div>
			<div className='lotteryCountdown'>Next lottery: 01:23:19</div>
		</>
	);
}
