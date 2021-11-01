import "./index.scss";
import useTypedReduxState from "../../../hooks/useTypedReduxState";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ALL_NFT_LOTTERIES } from "../../../../graphql/queries";
import Loader from "../../common/loader/Loader";
import AdminNftTable from "./adminNftTable.tsx/AdminNftTable";

export default function AdminNft(): JSX.Element {
  const [globalData, setGlobalData] = useTypedReduxState(
    (state) => state.globalData
  );

  const [, setAdminData] = useTypedReduxState((state) => state.adminData);

  const { refetch } = useQuery(FETCH_ALL_NFT_LOTTERIES, {
    onCompleted: (data) => {
      setGlobalData({
        type: "SET_GLOBAL_DATA",
        arg: {
          ...globalData,
          nfts: {
            refetch: refetch,
            nfts: data.getAllNfts,
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
  return globalData.nfts.nfts.length > 0 ? (
    <AdminNftTable data={globalData.nfts.nfts} />
  ) : (
    <Loader />
  );
}
