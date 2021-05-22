import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import moment from "moment"

const StyledTableCell = withStyles({
  root: {
    backgroundColor: "transparent",
    color: "white",
  },
})(TableCell);
const StyledPaper = withStyles({
  root: {
    borderRadius: 0,
  },
})(Paper);

export default function PoolTable({ rows }) {
  const history = useHistory();
  const poolDetails = (param) => {
    history.push(`/pools/${param}`);
  };

  return (
    <TableContainer component={StyledPaper}>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Pool</StyledTableCell>
            <StyledTableCell align="right">Prize Pool</StyledTableCell>
            <StyledTableCell align="right">Last Date</StyledTableCell>
            <StyledTableCell align="right">Pool ARP</StyledTableCell>
            <StyledTableCell align="right">Total Deposit</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              onClick={() => poolDetails(row.Pool)}
              className="tableRow"
              key={index}
            >
              <StyledTableCell component="th" scope="row">
                {row.Pool}
              </StyledTableCell>
              <StyledTableCell align="right">{row.PrizePool}</StyledTableCell>
              <StyledTableCell align="right">
                {moment(row.TimeRemaining).format('L')}
              </StyledTableCell>
              <StyledTableCell align="right">{row.PoolARP}</StyledTableCell>
              <StyledTableCell align="right">
                {row.TotalDeposit}
              </StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
