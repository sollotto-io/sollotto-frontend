import IconButton from "../iconButton/IconButton";
import Logout from "../../../../assets/images/svg/logout.svg";
import useReduxState from "../../../hooks/useReduxState";
import React from "react";

export default function WalletDisconnect({
  style,
}: {
  style?: React.CSSProperties;
}): JSX.Element {
  const [globalData] = useReduxState((state) => state.globalData);
  return (
    <IconButton
      tooltip={"logout"}
      icon={Logout}
      onClick={() => {
        globalData.selectedWallet.disconnect();
      }}
      style={
        style
          ? {
              ...style,
              ...{ cursor: "pointer" },
            }
          : { cursor: "pointer" }
      }
    />
  );
}
