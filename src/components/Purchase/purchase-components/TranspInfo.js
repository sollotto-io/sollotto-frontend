import React, { useContext } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Zoom from "@material-ui/core/Zoom";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { GlobalContext } from "../../../context/GlobalContext";
const TanspInfoToolTip = withStyles({
	tooltip: {
		background: "var(--tungsten)",
	},
	arrow: {
		color: "var(--tungsten)",
	},
})(Tooltip);

export default function TranspInfo() {
	const { globalData } = useContext(GlobalContext);
	const copyText = () => {
		var copyText = document.querySelector("#holdingWalletId").innerHTML;
		console.log(copyText);
		navigator.clipboard.writeText(copyText);
	};
	return (
		<TanspInfoToolTip
			title={
				<div className='transpInfoToolTip'>
					<div className='transpInfoToolTipTitle'>Addresses</div>
					<div className='transpInfoToolTipBody'>
						<span>RAY</span>
						<span className='copyText' id='holdingWalletId'>
							{globalData.holdingWalletId}
						</span>
						<FileCopyIcon onClick={copyText} fontSize='small' />
					</div>
				</div>
			}
			interactive
			arrow
			TransitionComponent={Zoom}
			placement='bottom-end'
		>
			<IconButton color='inherit' component='span'>
				<InfoOutlinedIcon />
			</IconButton>
		</TanspInfoToolTip>
	);
}
