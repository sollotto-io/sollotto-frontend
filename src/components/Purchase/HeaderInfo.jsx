import React, { useContext } from "react";
import TranspInfo from "./purchase-components/TranspInfo";
import IconButton from "@material-ui/core/IconButton";
import AlarmIcon from "@material-ui/icons/Alarm";
import { GlobalContext } from "../../context/GlobalContext";
import Counter from "../Pool/countdown"


export default function HeaderInfo(props) {
	const {globalData} = useContext(GlobalContext)
	return (
		<>
			<div className='headerIcons'>
				<TranspInfo />
				<IconButton color='inherit' component='span'>
					<AlarmIcon />
				</IconButton>
			</div>
			<div className='lotteryCountdown'><Counter time = {globalData.pools[0].TimeRemaining}/></div>
		</>
	);
}
