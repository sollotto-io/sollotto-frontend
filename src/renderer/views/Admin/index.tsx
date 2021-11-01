import "./index.scss";
import TabView from "../../components/admin/Tab/Tab";
import { useEffect, useState } from "react";
import CharityAdminTable from "../../components/admin/Charities/AdminCharity";
import Raffles from "../../components/admin/Raffles/Raffle";
// import Statistics from "../../components/admin/Statistics/Statistics";
import LaunchPad from "../../components/admin/LaunchPad/LaunchPad";
/* import Statistics from "../../components/admin/Statistics/Statistics"; */
import AdminPool from "../../components/admin/pool/AdminPool";
import AdminUsers from "../../components/admin/adminUsers/adminUsers";
import useTypedReduxState from "../../hooks/useTypedReduxState";
import AuthenticationForm from "../../components/admin/authenticationForm/AuthenticationForm";
import { ToastContainer, toast } from "react-toastify";
import AdminNft from "../../components/admin/nft/adminNft";

export default function Admin(): JSX.Element {
  const [{ authenticated, authErr }] = useTypedReduxState(
    (state) => state.adminData
  );
  const [globalData] = useTypedReduxState((state) => state.globalData);
  const [{ admin }] = useTypedReduxState((state) => state.adminData);
  const [tabState, setTabState] = useState(0);

  useEffect(() => {
    if (authErr) {
      toast.error("You are not authenticated", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [authErr]);

  useEffect(() => {
    localStorage.removeItem("token");
    return () => {
      localStorage.removeItem("token");
    };
  }, []);

  if (!authenticated) {
    return (
      <>
        <ToastContainer />
        <AuthenticationForm />
      </>
    );
  }
  return (
    <div className="admin-wrapper">
      <ToastContainer />
      <TabView tabState={tabState} setTabState={setTabState} admin={admin} />
      {tabState === 0 ? (
        <CharityAdminTable rows={globalData.charities.charities} />
      ) : tabState === 1 ? (
        <Raffles />
      ) : tabState === 2 ? (
        <AdminPool data={globalData.pools.pools} />
      ) : tabState === 3 ? (
        <LaunchPad />
      ) : tabState === 4 && admin ? (
        <AdminUsers />
      ) : (
        tabState === 5 && <AdminNft />
      )}
    </div>
  );
}
