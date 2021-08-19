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
          <TableRow className="tableRow">
            <StyledTableCell component="th" scope="row">
              CRAY
            </StyledTableCell>
            <StyledTableCell align="left">1000 CRAY</StyledTableCell>
            <StyledTableCell align="left">5</StyledTableCell>

           
            <StyledTableCell align="left"><Countdown date={"2021-08-22T00:00:00+00:00"}/></StyledTableCell>
            <StyledTableCell align="left">50 CRAY</StyledTableCell>
            <StyledTableCell align="left">10 CRAY</StyledTableCell>
            <StyledTableCell align="left">1000 CRAY</StyledTableCell>
            <StyledTableCell align="left">
              <p id="addedBy-Table" className="gradientBg gradientBorder">
                Deposit
              </p>
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
