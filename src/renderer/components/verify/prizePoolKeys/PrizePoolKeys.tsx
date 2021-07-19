import "./index.scss";
import keys from "../keys.json";
import keyIcon from "../../../../assets/images/svg/key.svg";
export default function PrizePoolKeys(): JSX.Element {
  return (
    <div className="prize-pool-keys verify-card gradientBg ">
      <div className="verify-content">
        <div className="verify-card-header">
          <img src={keyIcon} />
          <h2>Prize Pool Keys</h2>
        </div>
        <div className="verify-card-body">
          {keys.pool.map(({ name, key }) => (
            <div className="verify-key" key={key}>
              <h4>{name}</h4>
              {key}
            </div>
          ))}
        </div>
        {/*         <div className="verify-card-footer">
          <img src={sollogo} />
        </div> */}
      </div>
    </div>
  );
}
