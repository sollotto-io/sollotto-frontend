import "./index.scss";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";
import Countdown from "react-countdown";
import { FETCH_LAUNCHES } from "../../../../graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import useReduxState from "../../../hooks/useTypedReduxState";
import { ILaunch } from "../../../api/types/globalData";
import { useEffect } from "react";
import Loader from "../../common/loader/Loader";
import LaunchModal from "./launchModal/LaunchModal";

const StyledTableCell = withStyles({
  root: {
    backgroundColor: "transparent",
    color: "white",
    margin: 0,
    padding: "10px 15px 10px 15px",
  },
})(TableCell);
const StyledPaper = withStyles({
  root: {
    borderRadius: 0,
  },
})(Paper);

export default function LaunchTable(): JSX.Element {
  const [
    {
      launchPad: { launchPad },
    },
    setGlobalData,
  ] = useReduxState((state) => state.globalData);

  const { loading, refetch } = useQuery(FETCH_LAUNCHES, {
    onCompleted: (e) => {
      setGlobalData({
        type: "SET_GLOBAL_DATA",
        arg: {
          launchPad: {
            refetch: refetch,
            launchPad: e.getAllLaunched,
          },
        },
      });
    },
  });
  useEffect(() => {
    (async () => {
      await refetch();
    })();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <TableContainer component={StyledPaper}>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Pool</StyledTableCell>
            <StyledTableCell align="left">Pool Prize</StyledTableCell>
            <StyledTableCell align="left">Total Winners</StyledTableCell>
            <StyledTableCell align="left">Time Remaining</StyledTableCell>
            <StyledTableCell align="left">Max Deposit</StyledTableCell>
            <StyledTableCell align="left">Your Deposit</StyledTableCell>
            <StyledTableCell align="left">Total Deposit</StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {launchPad.map((row: ILaunch, index: number) => (
            <TableRow key={index} className="tableRow">
              <StyledTableCell component="th" scope="row">
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: 10,
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_IMAGE_LINK}${row.tokenLogo}`}
                    height={30}
                    width={30}
                    alt=""
                  />
                  {row.tokenName}
                </span>
              </StyledTableCell>
              <StyledTableCell align="left">1000 CRAY</StyledTableCell>
              <StyledTableCell align="left">{row.totalWinners}</StyledTableCell>

              <StyledTableCell align="left">
                <Countdown date={row.endDate} />
              </StyledTableCell>
              <StyledTableCell align="left">{row.maxDeposit}</StyledTableCell>
              <StyledTableCell align="left">10 CRAY</StyledTableCell>
              <StyledTableCell align="left">1000 CRAY</StyledTableCell>
              <StyledTableCell align="left">
                <LaunchModal
                  id={row.id}
                  rowIndex={index}
                  tokenName={row.tokenName}
                  maxDeposit={row.maxDeposit}
                />
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
