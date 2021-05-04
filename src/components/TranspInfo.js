import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Zoom from "@material-ui/core/Zoom";
import IconButton from "@material-ui/core/IconButton";

const TanspInfoToolTip = withStyles({
	tooltip: {
		background: "var(--tungsten)",
	},
	arrow: {
		color: "var(--tungsten)",
	},
})(Tooltip);

export default function TranspInfo() {
	// const [open, setOpen] = useState(false);

	// const handleTooltipClose = () => {
	// 	setOpen(false);
	// };

	// const handleTooltipOpen = () => {
	// 	setOpen(true);
	// };

	return (
		<TanspInfoToolTip
			title={<>Address: 1234567890</>}
			interactive
			arrow
			TransitionComponent={Zoom}
		>
			<IconButton color='inherit' component='span'>
				<InfoOutlinedIcon />
			</IconButton>
		</TanspInfoToolTip>
	);
}
