import "./index.scss";
import keys from "../keys.json";
import keyIcon from "../../../../assets/images/svg/key.svg";
import wallet from "../../../../assets/images/svg/wallet.svg";
import { getSolScanLink } from "../utils/helpers";

export default function PrizePoolKeys(): JSX.Element {
  return (
    <div className="prize-pool-keys verify-card gradientBg ">
      <div className="verify-content">
        <div className="verify-card-header">
          <img src={keyIcon} />
          <h2>Prize Pool & Team Keys</h2>
        </div>
        <div className="verify-card-body">
          {keys.pool.map(({ name, key }) => (
            <div className="verify-key" key={key}>
              <h4>{name}</h4>
              <div>
                <span>
                  <img src={wallet} />
                </span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={getSolScanLink(key)}
                >
                  {key}
                </a>
              </div>
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
