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
    padding: "10px 25px 10px 25px",
  },
})(TableCell);
const StyledPaper = withStyles({
  root: {
    borderRadius: 0,
  },
})(Paper);

export default function ResultTable({ rows }) {
  const history = useHistory();
  const resultDetails = (param) => {
    history.push(`/results/${param}`);
  };
 
  return (
    <TableContainer component={StyledPaper}>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Drawing Name</StyledTableCell>
            <StyledTableCell align="center">Drawing Date</StyledTableCell>
            <StyledTableCell align="center">Winners</StyledTableCell>
            <StyledTableCell align="center">Prize Pool</StyledTableCell>
            <StyledTableCell align="center">Total Winners</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
            onClick={() => resultDetails(row.DrawingName)}
              className="tableRow"
              key={index}
            >
              <StyledTableCell component="th" scope="row">
                {row.DrawingName}
              </StyledTableCell>
              <StyledTableCell align="center">
                { row.DrawingDate}
              </StyledTableCell>

              <StyledTableCell align="center">
                
                 {row.Winners}
                
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.PrizePool}
              </StyledTableCell>
              <StyledTableCell align="center">
                {" "}
                {row.TotalWinner}
              </StyledTableCell>
              <StyledTableCell align="center">Winner</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
