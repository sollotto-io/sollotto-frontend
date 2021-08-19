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
import { useEffect, useState } from "react";
import LaunchModal from "./LaunchPadModal/LaunchModal";
import { LAUNCHPAD_STATUS_CHAGED } from "../../../../graphql/mutations";
import { useMutation } from "@apollo/react-hooks";
import useReduxState from "../../../hooks/useReduxState";


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


export default function LaunchPad({ data }: { data: ILaunch[] }): JSX.Element {
    const [changeStatus] = useMutation(LAUNCHPAD_STATUS_CHAGED)
    const [globalData, setGlobalData] = useReduxState(
        (state) => state.globalData
      );
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
        await changeStatus({
          variables: {
            Id: id,
            Status: event.target.checked,
          },
        });
        setState(!state);
      };
      useEffect(() => {
        (async () => {
          const newRaffle = await globalData.raffles.refetch();
          if (newRaffle) {
            setGlobalData({
              type: "SET_GLOBAL_DATA",
              arg: {
                launchPad: {
                  ...globalData.launchPad,
                  launchPad: newRaffle.data.getAllLaunched,
                },
              },
            });
          }
        })();
      }, [state]);


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
              <StyledTableCell align="left">Time Remaining</StyledTableCell>
              <StyledTableCell align="left">Max Deposits</StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: ILaunch, index: number) => {
              return (
                <TableRow className="tableRow" key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.PoolName}
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    <img src={row.PoolImage} width={50} height={50} alt="img" />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Countdown date={row.TimeRemaining} />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.MaxDeposit}
                  </StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                    onClick={(e) => handleModalState(e, false, row.id)}
                    >
                      <EditRoundedIcon className="edit-delete-button" />
                    </IconButton>
                    <Switch
                      onClick={(e) => e.stopPropagation()}
                      checked={row.Status}
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
              />
    </>
  );
}
