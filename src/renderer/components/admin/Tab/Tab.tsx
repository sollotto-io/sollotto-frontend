import "./Tab.scss";

interface ITabView {
  tabState: number;
  setTabState: (value: number) => void;
}

export default function TabView({
  tabState,
  setTabState,
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
            Pool
          </p>
        </span>
      </div>
    </div>
  );
}
