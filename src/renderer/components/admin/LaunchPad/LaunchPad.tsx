import { ILaunch } from "../../../api/types/globalData";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import Switch from "@material-ui/core/Switch";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { IconButton, withStyles } from "@material-ui/core";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import Countdown from "react-countdown";
import { useState } from "react";
import LaunchModal from "./LaunchPadModal/LaunchModal";
import { LAUNCHPAD_STATUS_CHAGED } from "../../../../graphql/mutations";
import { useMutation, useQuery } from "@apollo/react-hooks";
import useReduxState from "../../../hooks/useTypedReduxState";
import { FETCH_LAUNCHES } from "../../../../graphql/queries";
import moment from "moment";

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

export default function LaunchPad(): JSX.Element {
  const { loading: launchLoading, refetch } = useQuery(FETCH_LAUNCHES, {
    onCompleted: (data) => {
      setGlobalData({
        type: "SET_GLOBAL_DATA",
        arg: {
          launchPad: {
            refetch: refetch,
            launchPad: data.getAllLaunched,
          },
        },
      });
    },
  });
  const [{ launchPad }, setGlobalData] = useReduxState(
    (state) => state.globalData
  );

  const [changeStatus] = useMutation(LAUNCHPAD_STATUS_CHAGED, {
    onCompleted: async (e) => {
      const updatedLaunch = { ...e.changeLaunchState };
      const launches = [...launchPad.launchPad];

      const index = launches.findIndex((l) => l.id === updatedLaunch.id);

      if (index !== -1) {
        launches[index] = updatedLaunch;
      }
      setGlobalData({
        type: "SET_GLOBAL_DATA",
        arg: {
          launchPad: {
            ...launchPad,
            launchPad: [...launches],
          },
        },
      });
    },
  });

  const [modalState, setModalState] = useState({
    state: false,
    type: false,
    id: "",
  });
  const [state, setState] = useState(false);
  const handleModalState = (
    e: React.MouseEvent<HTMLElement>,
    val: boolean,
    id: string
  ) => {
    e.stopPropagation();
    setModalState({
      state: true,
      type: val,
      id: id,
    });
  };
  const handleModalClose = () => {
    setModalState({
      state: false,
      type: false,
      id: "",
    });
  };
  const handleLaunchStatus = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    console.log(
      JSON.stringify({
        Id: id,
        status: event.target.checked,
      })
    );
    await changeStatus({
      variables: {
        Id: id,
        status: event.target.checked,
      },
    });
    setState(!state);
  };

  if (launchLoading) {
    return <h1>loading</h1>;
  }
  return (
    <>
      <button
        onClick={(e) => handleModalState(e, true, "")}
        className="gradientBg addCharityButton"
      >
        <p>Add LaunchPad Lottery</p> <AddCircleRoundedIcon />
      </button>
      <TableContainer component={StyledPaper}>
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Pool Name</StyledTableCell>
              <StyledTableCell>Pool Image</StyledTableCell>
              <StyledTableCell align="left">Total Winners</StyledTableCell>
              <StyledTableCell align="left">Start date</StyledTableCell>
              <StyledTableCell align="left">Resets in</StyledTableCell>
              <StyledTableCell align="left">Frequency</StyledTableCell>
              <StyledTableCell align="left">Max Deposits</StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {launchPad.launchPad.map((row: ILaunch, index: number) => {
              return (
                <TableRow className="tableRow" key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.tokenName}
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    <img
                      src={`${process.env.REACT_APP_IMAGE_LINK}${row.tokenLogo}`}
                      width={50}
                      height={50}
                      alt=""
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.totalWinners}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {moment(row.dueDate).format("MMM Do YY")}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Countdown date={row.endDate} />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    every {row.frequency > 1 ? `${row.frequency} days` : "day"}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.maxDeposit}
                  </StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      onClick={(e) => handleModalState(e, false, row.id)}
                    >
                      <EditRoundedIcon className="edit-delete-button" />
                    </IconButton>
                    <Switch
                      onClick={(e) => e.stopPropagation()}
                      checked={row.status}
                      onChange={(e) => {
                        handleLaunchStatus(e, row.id);
                      }}
                      color="primary"
                      // name={row.raffleName}
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </StyledTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <LaunchModal
        open={modalState.state}
        onClose={handleModalClose}
        edit={!modalState.type}
        id={modalState.id}
      />
    </>
  );
}
