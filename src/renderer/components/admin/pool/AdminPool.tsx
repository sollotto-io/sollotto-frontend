import "./index.scss";

import AdminPoolTable from "./adminPoolTable/AdminPoolTable";
import { IPool } from "../../../api/types/globalData";
import useTypedReduxState from "../../../hooks/useTypedReduxState";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ALL_POOLS } from "../../../../graphql/queries";
export default function AdminPool({ data }: { data: IPool[] }): JSX.Element {
  const [, setAdminData] = useTypedReduxState((state) => state.adminData);
  const [globalData, setGlobalData] = useTypedReduxState(
    (state) => state.globalData
  );
  const {
    loading: loadingPools,
    data: poolData,
    refetch: poolRefetch,
  } = useQuery(FETCH_ALL_POOLS, {
    onCompleted: (data) => {
      console.log(data);
      setGlobalData({
        type: "SET_GLOBAL_DATA",
        arg: {
          ...globalData,
          pools: {
            refetch: poolRefetch,
            pools: data.getAllPools,
          },
        },
      });
    },
    onError: () => {
      setAdminData({
        type: "SET_ADMIN_DATA",
        arg: {
          authErr: true,
        },
      });
    },
  });
  return (
    <>
      <AdminPoolTable data={data} />
    </>
  );
}
