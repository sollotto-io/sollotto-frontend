import "./index.scss";
import "./index.scss";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import { IPool } from "../../../../api/types/globalData";
import {
  TableHead,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  withStyles,
  Paper,
  Switch,
} from "@material-ui/core";

import EditRoundedIcon from "@material-ui/icons/EditRounded";

export default function AdminPoolTable({
  data,
}: {
  data: IPool[];
}): JSX.Element {
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
  return (
    <>
      <button
        onClick={(e) => console.log("hi")}
        className="gradientBg addCharityButton"
      >
        <p>Add Pool</p> <AddCircleRoundedIcon />
      </button>
      <TableContainer component={StyledPaper}>
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Raffle Name</StyledTableCell>
              <StyledTableCell align="left">Address</StyledTableCell>
              <StyledTableCell align="center">DueDate</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: IPool, index: number) => (
              <TableRow className="tableRow" key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.tokenName}
                </StyledTableCell>

                <StyledTableCell component="th" align="left">
                  {row.tokenAddress}
                </StyledTableCell>
                <StyledTableCell align="left">{row.dueDate}</StyledTableCell>
                <StyledTableCell
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <IconButton onClick={(e) => console.log(e)}>
                    <EditRoundedIcon className="edit-delete-button" />
                  </IconButton>
                  <Switch
                    onClick={(e) => e.stopPropagation()}
                    checked={row.status}
                    onChange={(e) => {
                      console.log(e);
                    }}
                    color="primary"
                    name={row.tokenName}
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
