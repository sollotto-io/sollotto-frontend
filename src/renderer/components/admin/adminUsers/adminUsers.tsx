import "./index.scss";

import AdminUsersTable from "./adminUsersTable/AdminUsersTable";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_ADMIN_USERS } from "../../../../graphql/queries";
import useTypedReduxState from "../../../hooks/useTypedReduxState";
import Loader from "../../common/loader/Loader";
export default function AdminUsers(): JSX.Element {
  const [
    {
      adminUsers: { users },
    },
    setGlobalData,
  ] = useTypedReduxState((state) => state.globalData);
  const { refetch, loading } = useQuery(GET_ALL_ADMIN_USERS, {
    onCompleted: (e) => {
      if (users.length === 0) {
        setGlobalData({
          type: "SET_GLOBAL_DATA",
          arg: {
            adminUsers: {
              users: e.getAllUsers,
              refetch: refetch,
            },
          },
        });
      }
    },
  });

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <AdminUsersTable data={users} />
    </>
  );
}
