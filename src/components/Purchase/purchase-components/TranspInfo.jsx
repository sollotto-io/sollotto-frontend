import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Zoom from "@material-ui/core/Zoom";
import IconButton from "@material-ui/core/IconButton";

  import 'react-toastify/dist/ReactToastify.css';


const TanspInfoToolTip = withStyles({
	tooltip: {
		background: "var(--tungsten)",
	},
	arrow: {
		color: "var(--tungsten)",
	},
})(Tooltip);

export default function TranspInfo() {


	return (
		<TanspInfoToolTip
		id="tooltip"
			title={
				<div className='transpInfoToolTip'>
					<div className='transpInfoToolTipTitle'>Instructions</div>
					<div className='transpInfoToolTipBody'>
						<span className='copyText' id='holdingWalletId'>
						Enter a number from 1 to 69 for your first 5 numbers
						 and a number from 1 to 26 for your last
						number, then select the charity you would like to vote for
						</span>
						
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
