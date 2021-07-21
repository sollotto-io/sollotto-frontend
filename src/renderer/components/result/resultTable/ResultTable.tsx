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
import moment from "moment";
import Loader from "../../common/loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import useReduxState from "../../../hooks/useReduxState";
import { IDrawing } from "../../../api/types/lotteryData";

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

export default function ResultTable({
  loading,
  rows,
}: {
  loading: boolean;
  rows: IDrawing[];
}): JSX.Element {
  const [globalData] = useReduxState((state) => state.globalData);

  const connectWallet = () => {
    toast.error("Please connect your wallet first!", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const history = useHistory();
  const resultDetails = (param: string) => {
    history.push(`/results/${param}`);
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <TableContainer component={StyledPaper}>
        <ToastContainer />
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Drawing Name</StyledTableCell>
              <StyledTableCell align="center">Drawing Date</StyledTableCell>
              <StyledTableCell align="center">Winning Numbers</StyledTableCell>
              <StyledTableCell align="center">Prize Pool</StyledTableCell>
              <StyledTableCell align="center">Total Winners</StyledTableCell>
              <StyledTableCell align="center">Winning Charity</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) =>
              !globalData.walletConnectedFlag ? (
                <TableRow
                  className="tableRow"
                  onClick={connectWallet}
                  key={index}
                >
                  <StyledTableCell component="th" scope="row">
                    Pick 6
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {moment(row.EndDate).format("MMM Do YY")}
                  </StyledTableCell>

                  <StyledTableCell align={"center"}>
                    {row.WinningNumbers.length !== 6 ? (
                      "TBD"
                    ) : (
                      <>
                        row.WinningNumbers[0] &nbsp; {row.WinningNumbers[1]}
                        &nbsp; {row.WinningNumbers[2]}
                        &nbsp; {row.WinningNumbers[3]}&nbsp;
                        {row.WinningNumbers[4]}
                        &nbsp; {row.WinningNumbers[5]}
                      </>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.TotalPoolValue === null
                      ? 0
                      : row.TotalPoolValue.toFixed(2)}{" "}
                    SOL
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    {row.WinnerWallet.length === 0 &&
                    new Date(row.EndDate) < new Date(Date.now())
                      ? 0
                      : row.WinnerWallet.length === 0 &&
                        new Date(row.EndDate) > new Date(Date.now())
                      ? "TBD"
                      : row.WinnerWallet.length}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.WinningCharity.length === 0
                      ? "TBD"
                      : row.WinningCharity.length === 1
                      ? row.WinningCharity[0].charityName
                      : `${row.WinningCharity.length} Way Tie`}
                  </StyledTableCell>
                </TableRow>
              ) : (
                <TableRow
                  onClick={() => resultDetails(row.id)}
                  className="tableRow"
                  key={index}
                >
                  <StyledTableCell component="th" scope="row">
                    Pick 6
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {moment(row.EndDate).format("MMM Do YY")}
                  </StyledTableCell>

                  <StyledTableCell
                    align={`${
                      row.WinningNumbers.length !== 6 ? "center" : "left"
                    }`}
                  >
                    {row.WinningNumbers.length !== 6
                      ? "TBD"
                      : row.WinningNumbers[0]}
                    &nbsp; {row.WinningNumbers[1]}&nbsp; {row.WinningNumbers[2]}
                    &nbsp; {row.WinningNumbers[3]}&nbsp; {row.WinningNumbers[4]}
                    &nbsp; {row.WinningNumbers[5]}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.TotalPoolValue === null
                      ? 0
                      : row.TotalPoolValue.toFixed(2)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    {row.WinnerWallet.length === 0 &&
                    new Date(row.EndDate) < new Date(Date.now())
                      ? 0
                      : row.WinnerWallet.length === 0 &&
                        new Date(row.EndDate) > new Date(Date.now())
                      ? "TBD"
                      : row.WinnerWallet.length}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.WinningCharity.length === 0
                      ? "TBD"
                      : row.WinningCharity.length === 1
                      ? row.WinningCharity[0].charityName
                      : `${row.WinningCharity.length} Way Tie`}
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
