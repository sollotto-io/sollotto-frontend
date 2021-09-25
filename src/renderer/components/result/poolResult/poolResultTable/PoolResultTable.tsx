import "./index.scss";

import "./index.scss";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import useTypedReduxState from "../../../../hooks/useTypedReduxState";
import moment from "moment";
import PageSubTitle from "../../../common/pageSubtitle/Subtitle";
const StyledTableCell = withStyles({
  root: {
    backgroundColor: "transparent",
    color: "white",
    padding: "10px 25px 10px 25px",
  },
})(TableCell);
const StyledPaper = withStyles({
  root: {
    borderRadius: 0,
  },
})(Paper);

export default function PoolResultsTable(): JSX.Element {
  const [
    {
      pools: { pools },
    },
  ] = useTypedReduxState((state) => state.globalData);
  return (
    <>
      {pools.map((row) => (
        <>
          <PageSubTitle subtitle={row.tokenName} />
          {row.passPools.length > 0 ? (
            <>
              <TableContainer component={StyledPaper}>
                <ToastContainer />
                <Table className="table" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Token</StyledTableCell>
                      <StyledTableCell>Prize Pool</StyledTableCell>
                      <StyledTableCell>Winner</StyledTableCell>
                      <StyledTableCell>Finish Date</StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {row.passPools.map((passPool) => (
                      <TableRow className="tableRow" key={passPool.id}>
                        <StyledTableCell align="center">
                          <div className="p-name">
                            <img
                              src={`${process.env.REACT_APP_IMAGE_LINK}${row.tokenLogo}`}
                            />{" "}
                            {row.tokenName}
                          </div>
                        </StyledTableCell>
                        <StyledTableCell>1000</StyledTableCell>
                        <StyledTableCell align="left">
                          {passPool.winningWalletId}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {moment(passPool.finishDate).format("MMM Do YY")}
                        </StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <div className="coming-soon gradientBg gradientBorder">
              <div>
                <PageSubTitle subtitle="Not Yet" />
              </div>
            </div>
          )}
        </>
      ))}
    </>
  );
}
