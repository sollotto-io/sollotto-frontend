import "./index.scss";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useEffect, useState } from "react";

import { withStyles } from "@material-ui/core";
import useTypedReduxState from "../../hooks/useTypedReduxState";
import { convertPK } from "../../../utils/helpers";
import {
  GET_TICKET_COUNT_BY_USER,
  GET_TICKET_COUNT,
} from "../../../graphql/queries";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import Countdown from "react-countdown";

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

export default function Model4Table(): JSX.Element {
  const [{ selectedWallet, walletConnectedFlag }] = useTypedReduxState(
    (state) => state.globalData
  );

  const [yourTickets, setYourTickets] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);

  const [getYourTickets] = useLazyQuery(GET_TICKET_COUNT_BY_USER, {
    onCompleted: (e) => {
      setYourTickets(e.getTicketsByUserCount);
    },
  });
  const { refetch } = useQuery(GET_TICKET_COUNT, {
    onCompleted: (e) => {
      setTotalTickets(e.getTicketsCount);
    },
  });

  useEffect(() => {
    if (selectedWallet) {
      getYourTickets({
        variables: {
          walletId: convertPK(selectedWallet),
        },
      });
    }
    refetch();
  }, [walletConnectedFlag]);
  return (
    <TableContainer component={StyledPaper}>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Pool</StyledTableCell>
            <StyledTableCell align="center">Prize Pool</StyledTableCell>
            <StyledTableCell align="center">Time Remaining</StyledTableCell>
            <StyledTableCell align="center">Your Tickets</StyledTableCell>
            <StyledTableCell align="center">Total Tickets</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className="tableRow">
            <StyledTableCell component="th" scope="row">
              Model 4
            </StyledTableCell>
            <StyledTableCell align="center">10000</StyledTableCell>
            <StyledTableCell align="center">
              <Countdown date={new Date("09-12-2021")} />
            </StyledTableCell>
            <StyledTableCell align="center">{yourTickets}</StyledTableCell>
            <StyledTableCell align="center">{totalTickets}</StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
