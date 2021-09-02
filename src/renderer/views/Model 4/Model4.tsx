import "./index.scss";
import PageTitle from "../../components/common/pageTitle/PageTitle";
import Model4Table from "../../components/model4Table/Model4Table";
export default function Model4(): JSX.Element {
  return (
    <div className="model4-wrapper">
      <div className="model4">
        <PageTitle title="Pool" />
        <Model4Table />
      </div>
    </div>
  );
}
