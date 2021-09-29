import "./index.scss";
import PageSubTitle from "../../../components/common/pageSubtitle/Subtitle";
import Model4ResultTable from "../../../components/result/model4Result/model4ResultTable/Model4ResultTable";
export default function Model4Results(): JSX.Element {
  return (
    <>
      <PageSubTitle subtitle="Past Model 4" />
      <Model4ResultTable />
    </>
  );
}
