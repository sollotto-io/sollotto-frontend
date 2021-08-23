import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Purchase from "./renderer/views/Purchase/Purchase";
import Charities from "./renderer/views/Charity/Charities";
import Loader from "./renderer/components/common/loader/Loader";
import Navbar from "./renderer/components/navbar/Navbar";
import CharityDetail from "./renderer/components/charity/charityDetail/CharityDetail";
import Results from "./renderer/views/Results/Results";
import ResultDetail from "./renderer/components/result/resultDetail/ResultDetail";
 import Pool from "./renderer/views/Pool/Pool"; 
import Footer from "./renderer/views/Footer/Footer";
import useReduxState from "./renderer/hooks/useReduxState";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ALL_CHARITIES, FETCH_UPCOMING_DRAWING } from "./graphql/queries";
// import Verify from "./renderer/views/Verify/Verify";
// import Admin from "./renderer/views/Admin";
// import LaunchPad from "./renderer/views/LauchPad/LaunchPad";
// import GrapeIDO from "./renderer/views/GrapeIDO";
// import GrapeIDO from "./renderer/views/GrapeIDO";
// import Pool2 from "./renderer/views/Pool/Pool2/Pool2";

function Main(): JSX.Element {
  const [globalData, setGlobalData] = useReduxState(
    (state) => state.globalData
  );
  const { loading, data, refetch } = useQuery(FETCH_UPCOMING_DRAWING);
  const [, setLotteryData] = useReduxState((state) => state.lotteryData);
  const {
    loading: charityloading,
    data: charities,
    refetch: charityRefetch,
  } = useQuery(FETCH_ALL_CHARITIES);

  useEffect(() => {
    if (charityloading === false) {
      setGlobalData({
        type: "SET_GLOBAL_DATA",
        arg: {
          ...globalData,
          charities: {
            refetch: charityRefetch,
            charities: charities.getAllCharities,
          },
        },
      });
    }
    if (!loading) {
      setLotteryData({
        type: "SET_LOTTERY_DATA",
        arg: {
          loading,
          lotteryData: data.getActiveDrawing,
          refetch: refetch,
        },
      });
    }
  }, [loading, charityloading]);

  useEffect(() => {
    if (globalData.selectedWallet) {
      globalData.selectedWallet.on("connect", () => {
        setGlobalData({
          type: "SET_GLOBAL_DATA",
          arg: { walletConnectedFlag: true },
        });
      });
      globalData.selectedWallet.on("disconnect", () => {
        setGlobalData({
          type: "SET_GLOBAL_DATA",
          arg: { walletConnectedFlag: false, selectedWallet: null },
        });
      });
      globalData.selectedWallet.connect();
      return () => {
        if (globalData.selectedWallet) {
          globalData.selectedWallet.disconnect();
        }
      };
    }
  }, [globalData.selectedWallet]);

  useEffect(() => {
    if (
      globalData.selectedWallet !== null &&
      globalData.selectedWallet.publicKey
    ) {
      const bal = globalData.connection.getBalance(
        globalData.selectedWallet.publicKey
      );
      bal.then((t: number) => {
        setGlobalData({
          type: "SET_GLOBAL_DATA",
          arg: {
            walletBalance: t,
          },
        });
      });
    }
  }, [globalData.walletConnectedFlag]);

  if (loading) {
    return <Loader />;
  }
  return (
    <Router>
      <div className="App">
        <Switch>
        {/* <Route
            path="/grape-poker-verify"
            component={() => {
              window.location.href = "https://solscan.io/account/gptESaaPJ9WZpjt7WhULDgne88T1u5rCLBxBJyb7fB7?cluster=devnet";
              return null;
            }}
          /> */}
          {/* <Route exact path="/admin" component={Admin} /> */}
          {/* <Route exact path="/grape-parrot-ido" component={GrapeIDO} /> */}
          <Route path="/">
            <Navbar />
            <Switch>
              {/* Redirecting to purchase page if at '/' */}
              {/* Routes  */}

              <Route exact path="/">
                <Redirect to="/purchase" />
              </Route>
              <Route exact path="/purchase">
                <Purchase />
              </Route>
              <Route exact path="/results">
                <Results />
              </Route>
              <Route exact path="/results/:id">
                <ResultDetail />
              </Route>

              <Route exact path="/charities">
                <Charities charityloading={charityloading && loading} />
              </Route>
              {/* <Route exact path="/suggest">
                <Suggest />
              </Route> */}
              <Route exact path="/pools">
                {/* <Pool2 /> */}
                <Pool/>
              </Route>
              {/* <Route exact path="/lauchpad">
                <LaunchPad/>
              </Route> */}
              {/* <Route exact path="/verify">
                <Verify />
              </Route> */}
              <Route exact path="/charities/:id">
                <CharityDetail />
              </Route>
            </Switch>
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Main;
