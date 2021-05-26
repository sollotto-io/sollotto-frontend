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

export default function CharityTable({ rows }) {
  const history = useHistory();
  const poolDetails = (param) => {
    history.push(`/charities/${param}`);
  };

  return (
    <TableContainer component={StyledPaper}>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Charity Name</StyledTableCell>
            <StyledTableCell align="right">Current Votes</StyledTableCell>
            <StyledTableCell align="right">Added By</StyledTableCell>
            <StyledTableCell align="right">Life Time Votes</StyledTableCell>
            <StyledTableCell align="right">Total Contribution</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              onClick={() => poolDetails(row.charityName)}
              className="tableRow"
              key={index}
            >
              <StyledTableCell component="th" scope="row">
                {row.charityName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.currentVotes === null ? "N/A" : row.currentVotes}</StyledTableCell>
            
              <StyledTableCell align="right">Sollotto</StyledTableCell>
              <StyledTableCell align="right">
              {row.lifeTimeVotes === null ? "N/A" : row.lifeTimeVotes}
              </StyledTableCell>
              <StyledTableCell align="right"> {row.lifeTimeVotes === null ? "N/A" : row.lifeTimeVotes}</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
