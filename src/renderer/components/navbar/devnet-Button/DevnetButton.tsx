import "./index.scss";
import { useState } from "react";
import { Tooltip, makeStyles } from "@material-ui/core";
import { useMediaQuery } from "react-responsive";

const TooltipStyles = makeStyles({
  tooltip: {
    color: "white",
    backgroundColor: "var(--dark-blue)",
    fontSize: "15px",
  },
});
export default function DevnetButton(): JSX.Element {
  const classes = TooltipStyles();
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery({
    query: "(max-width: 992px)",
  });

  const handleTooltip = () => {
    setOpen(!open);
  };
  const mobileProperties = {
    onClose: () => setOpen(false),
    open: open,
    disableFocusListener: true,
    disableHoverListener: true,
    onclick: handleTooltip,
  };
  return (
    <Tooltip
      classes={{ tooltip: classes.tooltip }}
      title="All assets in the current version are for testing purposes only and have no real value."
      {...(isMobile ? { ...mobileProperties } : null)}
    >
      <button
        className="devnet-btn"
        {...(isMobile ? { onClick: () => handleTooltip() } : null)}
      >
        Devnet
      </button>
    </Tooltip>
  );
}
