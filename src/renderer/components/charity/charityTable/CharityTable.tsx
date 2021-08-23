import "./index.scss";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import { ICharity } from "../../../api/types/globalData";
import NominationModal from "./nominationModal/NominationModal";

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

export default function CharityTable({
  rows,
  nominate,
}: {
  rows: ICharity[];
  nominate?: boolean;
}): JSX.Element {
  const history = useHistory();
  const poolDetails = (param: string) => {
    history.push({
      pathname: `/charities/${param}`,
      state: { fromPurchase: false, fromAdmin: false },
    });
  };
  return (
    <TableContainer component={StyledPaper}>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Charity Name</StyledTableCell>
            <StyledTableCell align="center">
              {nominate ? "Nomination Votes" : "Current Votes"}
            </StyledTableCell>
            <StyledTableCell align="center">Added By</StyledTableCell>
            <StyledTableCell align="center">Lifetime Votes</StyledTableCell>
            <StyledTableCell align="center">
              {nominate ? "Nominate" : "Total Wins"}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: ICharity, index: number) => (
            <TableRow
              onClick={() => poolDetails(row.charityName)}
              className="tableRow"
              key={index}
            >
              <StyledTableCell component="th" scope="row">
                {row.charityName}
              </StyledTableCell>
              <StyledTableCell align="center">
                {nominate ? row.nominationVotes : row.currentVotes}
              </StyledTableCell>

              <StyledTableCell align="center">
                <p id="addedBy-Table" className="gradientBg gradientBorder">
                  SolLotto
                </p>
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.lifeTimeVotes ? row.lifeTimeVotes : 0}
              </StyledTableCell>
              <StyledTableCell align="center">
                {" "}
                {!nominate ? (
                  row.lifeTimeWins ? (
                    row.lifeTimeWins
                  ) : (
                    "0"
                  )
                ) : (
                  <NominationModal id={row.id} rowIndex={index} />
                )}
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}