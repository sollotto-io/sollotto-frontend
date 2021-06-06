import React, { useContext } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Zoom from "@material-ui/core/Zoom";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { GlobalContext } from "../../../context/GlobalContext";
import { toast } from 'react-toastify';
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
	const { globalData } = useContext(GlobalContext);
	const copyText = () => {
		var copyText = globalData.holdingWalletId;
		console.log(copyText);
		navigator.clipboard.writeText(copyText);
		toast.success('Address copied', {
			position: "bottom-left",
			autoClose: 3000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			});
	};
	return (
		<TanspInfoToolTip
		id="tooltip"
			title={
				<div className='transpInfoToolTip'>
					<div className='transpInfoToolTipTitle'>Addresses</div>
					<div className='transpInfoToolTipBody'>
						<span>SOL</span>
						<span className='copyText' id='holdingWalletId'>
							{globalData.holdingWalletId.substring(0,7)} ... {globalData.holdingWalletId.substring(globalData.holdingWalletId.length - 7)}
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
