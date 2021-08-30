import "./Tab.scss";

interface ITabView {
  tabState: number;
  setTabState: (value: number) => void;
  admin: boolean;
}

export default function TabView({
  tabState,
  setTabState,
  admin,
}: ITabView): JSX.Element {
  const handleTabChange = (value: number) => {
    setTabState(value);
  };

  return (
    <div className={"tabView"}>
      <div id="tabs">
        <h4>SolLotto Admin</h4>
        <span>
          <p
            onClick={() => handleTabChange(0)}
            className={tabState === 0 ? "active" : ""}
          >
            Charities
          </p>
          <p
            onClick={() => handleTabChange(1)}
            className={tabState === 1 ? "active" : ""}
          >
            {" "}
            Raffles
          </p>
          <p
            onClick={() => handleTabChange(2)}
            className={tabState === 2 ? "active" : ""}
          >
            Pools
          </p>
          <p
            onClick={() => handleTabChange(3)}
            className={tabState === 3 ? "active" : ""}
          >
            Launch Pad
          </p>
          {admin && (
            <p
              onClick={() => handleTabChange(4)}
              className={tabState === 4 ? "active" : ""}
            >
              Admin Users
            </p>
          )}
        </span>
      </div>
    </div>
  );
}
