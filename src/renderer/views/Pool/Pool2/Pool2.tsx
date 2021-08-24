import "./index.scss";
import PageTitle from "../../../components/common/pageTitle/PageTitle";
import PoolTable from "../../../components/pool/poolTable/PoolTable";
export default function Pool2(): JSX.Element {

 

  return (
    <div className="pageWrapperPools ">
      <div className="pools">
        <PageTitle title="Pools" />
        <PoolTable />
      </div>
    </div>
  );
}
