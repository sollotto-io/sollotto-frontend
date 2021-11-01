import "./index.scss";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";
import { ToastContainer } from "react-toastify";

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

type rowType = string | number;
interface IResultsTable {
  headers: string[];
  rows: rowType[][];
}

export default function ResultsTable({ headers, rows }: IResultsTable) {
  return (
    <TableContainer component={StyledPaper}>
      <ToastContainer />
      <Table className="table" aria-label="simple table">
        <TableHead>
          {headers.map((head) => (
            <StyledTableCell>{head}</StyledTableCell>
          ))}
        </TableHead>
      </Table>
      <TableBody>
        {rows.map((row) => (
          <TableRow className="tableRow">
            {row.map((column) => (
              <StyledTableCell align="center">{column}</StyledTableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
}
