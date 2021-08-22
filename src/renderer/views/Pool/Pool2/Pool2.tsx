import "./index.scss";
import PageTitle from "../../../components/common/pageTitle/PageTitle";
import PoolTable from "../../../components/pool/poolTable/PoolTable";
import useReduxState from "../../../hooks/useReduxState";
import { FETCH_ALL_POOLS } from "../../../../graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../../../components/common/loader/Loader";
import { useEffect } from "react";
import useDidUpdateEffect from "../../../hooks/useDidUpdateEffect";
import { IPool } from "../../../api/types/globalData";
export default function Pool2(): JSX.Element {
  const [{ pools }, setGlobalData] = useReduxState((state) => state.globalData);
  const {
    loading: loadingPools,
    data: poolData,
    refetch: poolRefetch,
  } = useQuery(FETCH_ALL_POOLS);

  useEffect(() => {
    poolRefetch();
  }, []);

  useDidUpdateEffect(() => {
    setGlobalData({
      type: "SET_GLOBAL_DATA",
      arg: {
        pools: {
          refetch: poolRefetch,
          pools: poolData.getAllPools,
        },
      },
    });
  }, [loadingPools]);

  if (loadingPools) {
    return <Loader />;
  }
  return (
    <div className="pageWrapper ">
      <div className="pools">
        <PageTitle title="Pools" />
        <PoolTable rows={pools.pools.filter((ps: IPool) => ps.status)} />
      </div>
    </div>
  );
}
