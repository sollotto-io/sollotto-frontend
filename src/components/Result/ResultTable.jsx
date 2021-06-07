import React, { useContext, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { FETCH_ALL_LOTTERIES } from "../../graphql/queries";
import Loader from "../common/Loader";
import { GlobalContext } from "../../context/GlobalContext";
import { toast, ToastContainer } from "react-toastify";

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

export default function ResultTable() {
  const { globalData } = useContext(GlobalContext);
  
  const connectWallet = ()=>{

    toast.error('PLease connect your wallet first!! ', {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      })
  }
  const { loading, data, refetch } = useQuery(FETCH_ALL_LOTTERIES);
  useEffect(() => refetch()
, [])// eslint-disable-line react-hooks/exhaustive-deps

  const history = useHistory();
  const resultDetails = (param) => {
    history.push(`/results/${param}`);
  };
  if (loading) {
    return <Loader />;
  }
  else {
    return (
      <TableContainer component={StyledPaper}>
        <ToastContainer/>
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Drawing Name</StyledTableCell>
              <StyledTableCell align="center">Drawing Date</StyledTableCell>
              <StyledTableCell align="center">Winners</StyledTableCell>
              <StyledTableCell align="center">Prize Pool</StyledTableCell>
              <StyledTableCell align="center">Total Winners</StyledTableCell>
              <StyledTableCell align="center">Winning Charity</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.getAllLotteries.map((row, index) =>
              globalData.selectedWallet === null ? (
                <TableRow className="tableRow" onClick = {connectWallet} key={index}>
                  <StyledTableCell component="th" scope="row">
                    Pick 6
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {moment(row.EndDate).format("MMM Do YY")}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.WinnerWallet.length}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.TotalPoolValue.toFixed(2)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    {row.WinnerWallet.length}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.WinningCharity.length}
                  </StyledTableCell>
                </TableRow>
              ) : (
                <TableRow
                  onClick={() => resultDetails(row.Id)}
                  className="tableRow"
                  key={index}
                >
                  <StyledTableCell component="th" scope="row">
                    Pick 6
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {moment(row.EndDate).format("MMM Do YY")}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.WinningNumbers[0]}&nbsp;&nbsp;{row.WinningNumbers[1]}&nbsp;&nbsp;{row.WinningNumbers[2]}&nbsp;&nbsp;{row.WinningNumbers[3]}&nbsp;&nbsp;{row.WinningNumbers[4]}&nbsp;&nbsp;{row.WinningNumbers[5]}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.TotalPoolValue.toFixed(2)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    {row.WinnerWallet.length}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.WinningCharity.length}
                  </StyledTableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
