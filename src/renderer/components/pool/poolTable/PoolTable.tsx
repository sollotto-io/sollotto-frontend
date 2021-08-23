import "./index.scss";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { PublicKey } from "@solana/web3.js";

import PoolModal from "./poolModal/poolModal";
import { withStyles } from "@material-ui/core";
import CountDown from "../../common/countDown/CountDown";
import { IPool } from "../../../api/types/globalData";
import useTypedReduxState from "../../../hooks/useTypedReduxState";
import { useEffect } from "react";

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

export default function PoolTable({ rows }: { rows: IPool[] }): JSX.Element {
  const [{ connection }] = useTypedReduxState((state) => state.globalData);

  useEffect(() => {
    (async () => {
      const tok = await connection.getAccountInfo(
        new PublicKey("DR9bNjsv25meGDeXqQLqf6Xoo1LBpdhP6wiuQ4ir2Jmo")
      );
      const tok2 = await connection.getConfirmedSignaturesForAddress2(
        new PublicKey("DR9bNjsv25meGDeXqQLqf6Xoo1LBpdhP6wiuQ4ir2Jmo")
      );

      const tx = await connection.getParsedConfirmedTransactions(
        tok2.map((t) => t.signature)
      );
      console.log(tx);
      console.log(tok);
      console.log(tok2);
    })();
  }, []);
  return (
    <TableContainer component={StyledPaper}>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Pool</StyledTableCell>
            <StyledTableCell align="center">Prize Pool</StyledTableCell>
            <StyledTableCell align="center">Time Remaining</StyledTableCell>
            <StyledTableCell align="center">Your Deposit</StyledTableCell>
            <StyledTableCell align="center">Total Deposit</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow className="tableRow" key={index}>
              <StyledTableCell component="th" scope="row">
                <div className="p-name">
                  <img
                    src={`${process.env.REACT_APP_IMAGE_LINK}${row.tokenLogo}`}
                  />{" "}
                  {row.tokenName}
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">{1000}</StyledTableCell>
              <StyledTableCell align="center">
                <CountDown date={row.dueDate} />
                {/* {moment(row.dueDate).format("L")} */}
              </StyledTableCell>
              <StyledTableCell align="center">{10000}</StyledTableCell>
              <StyledTableCell align="center">{10000}</StyledTableCell>
              <StyledTableCell align="center">
                <PoolModal
                  rowIndex={index}
                  id={`rowIndex`}
                  tokenName={row.tokenName}
                />
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
