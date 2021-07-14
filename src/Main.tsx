import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,

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
/* import Nav from "./components/Nav";
import Purchase from "./pages/Purchase";
import Charities from "./pages/Charities";
import Suggest from "./pages/Suggest";
import Results from "./pages/Results";
import Pool from "./pages/Pool";
import CharityDetailPage from "./components/Charity/CharityDetailPage.js";
import Loader from "./components/common/Loader";
import Footer from "./pages/Footer";
import ResultDetail from "./components/Result/ResultDetail"; */
/* import "./css/pool.css"; */
import useReduxState from "./renderer/hooks/useReduxState";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ALL_CHARITIES, FETCH_UPCOMING_DRAWING } from "./graphql/queries";
import GrapeIDO from "./renderer/views/GrapeIDO";


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
  }, [loading, charityloading, ]);

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
        globalData.selectedWallet.disconnect();
      };
    }
  }, [globalData.selectedWallet]);

  useEffect(() => {
    if (globalData.selectedWallet !== null) {
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
    <div className="App">
        <Router>
        
          <Route path="/">
            <Navbar />
            <Link to = "/grapeIDO"><p>hello</p></Link>
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
                <Charities charityloading={charityloading} />
              </Route>
              {/*           <Route exact path="/suggest">
                <Suggest />
              </Route> */}
              <Route exact path="/pools">
                <Pool />
              </Route>
              <Route exact path="/charities/:id">
                <CharityDetail />
              </Route>
              <Route exact path="/grapeIDO">
                <GrapeIDO />
              </Route>
            </Switch>
            <Footer />
          </Route>
         
        
    </Router>
      </div>
  );
}

export default Main;
