import "./index.scss";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import PoolModal from "./poolModal/poolModal";
import { withStyles } from "@material-ui/core";
import Countdown from "react-countdown";
import { IPool } from "../../../api/types/globalData";
import { useQuery } from "@apollo/client";
import useReduxState from "../../../hooks/useReduxState";
import { FETCH_ALL_POOLS } from "../../../../graphql/queries";
import Loader from "../../common/loader/Loader";
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

export default function PoolTable(): JSX.Element {
  const [, setGlobalData] = useReduxState((state) => state.globalData);
  const {
    loading: loadingPools,
    data: poolData,
    refetch: poolRefetch,
  } = useQuery(FETCH_ALL_POOLS, {
    onCompleted: () => {
      setGlobalData({
        type: "SET_GLOBAL_DATA",
        arg: {
          pools: {
            refetch: poolRefetch,
            pools: poolData.getAllPools,
          },
        },
      });
    },
  });
  useEffect(() => {
    (async () => {
      const data = await poolRefetch();
      console.log(data);
      console.log("mounted");
    })();
  }, []);
  if (loadingPools) {
    return <Loader />;
  }
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
          {poolData.getAllPools
            .filter((ps: IPool) => ps.status)
            .map((row: IPool, index: number) => (
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
                  <Countdown date={new Date(row.dueDate)} />
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
