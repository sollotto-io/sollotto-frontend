import "./index.scss";
import keys from "../keys.json";
import keyIcon from "../../../../assets/images/svg/key.svg";
export default function CharitiesKeys(): JSX.Element {
  return (
    <div className="charity-keys verify-card gradientBg ">
      <div className="verify-content">
        <div className="verify-card-header">
          <img src={keyIcon} />
          <h2>Charities Keys</h2>
        </div>
        <div className="verify-card-body">
          {keys.charities.map(({ name, key }) => (
            <div className="verify-key" key={key}>
              <h4>{name}</h4>
              {key}
            </div>
          ))}
        </div>
        {/*         <div className="verify-card-footer">
          <img src={charity} />
        </div> */}
      </div>
    </div>
  );
}
