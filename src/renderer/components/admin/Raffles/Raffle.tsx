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
/* import { useHistory } from "react-router"; */
import { useMutation } from "@apollo/react-hooks";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import { useEffect, useState } from "react";
import { IRaffle } from "../../../api/types/globalData";
import { CHANGE_RAFFLE_STATUS } from "../../../../graphql/mutations";
import RaffleModal from "./raffleModal/RaffleModal";
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

export default function RaffleTable({
  data,
}: {
  data: IRaffle[];
}): JSX.Element {
  console.log(data)
  const [changeStatus] = useMutation(CHANGE_RAFFLE_STATUS);
  const [globalData, setGlobalData] = useReduxState(
    (state) => state.globalData
  );
  const [modalState, setModalState] = useState({
    state: false,
    type: false,
    id: "",
    index: -1,
  });

  const [state, setState] = useState(false);
  useEffect(() => {
    (async () => {
      if (globalData.raffles.refetch) {
        const newRaffle = await globalData.raffles.refetch();
        console.log(newRaffle)
        if (newRaffle.data) {
          setGlobalData({
            type: "SET_GLOBAL_DATA",
            arg: {
              raffles: {
                ...globalData.raffles,
                raffles: newRaffle.data.getAllRaffle,
              },
            },
          });
        }
      }
    })();
   
  }, [state,modalState]);

  /*   const history = useHistory(); */
  const handleModalState = (
    e: React.MouseEvent<HTMLElement>,
    val: boolean,
    id: string,
    index: number
  ) => {
    e.stopPropagation();
    setModalState({
      state: true,
      type: val,
      id: id,
      index,
    });
  };
  const handleModalClose = () => {
    setModalState({
      state: false,
      type: false,
      id: "",
      index: -1,
    });
  };
  const handleCharityStatus = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    await changeStatus({
      variables: {
        raffleId: id,
        status: event.target.checked,
      },
    });
    setState(!state);
  };

  if (data !== []) {
    return (
      <>
        <button
          onClick={(e) => handleModalState(e, true, "", -1)}
          className="gradientBg addCharityButton"
        >
          <p>Add Raffle</p> <AddCircleRoundedIcon />
        </button>
        <TableContainer component={StyledPaper}>
          <Table className="table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Raffle Name</StyledTableCell>
                <StyledTableCell align="left">Address</StyledTableCell>
                <StyledTableCell align="center">Edit</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row:IRaffle, index: number) => (
                <TableRow className="tableRow" key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.raffleName}
                  </StyledTableCell>

                  <StyledTableCell component="th" align="left">
                    {row.raffleStatus === "Testing"
                      ? row.testingWA
                      : row.liveWA}
                  </StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      onClick={(e) => handleModalState(e, false, row.id, index)}
                    >
                      <EditRoundedIcon className="edit-delete-button" />
                    </IconButton>
                    <Switch
                      onClick={(e) => e.stopPropagation()}
                      checked={row.Status}
                      onChange={(e) => {
                        handleCharityStatus(e, row.id);
                      }}
                      color="primary"
                      name={row.raffleName}
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <RaffleModal
          open={modalState.state}
          onClose={handleModalClose}
          edit={!modalState.type}
          data={data[modalState.index]}
        />
      </>
    );
  }

  return <h1>hello</h1>;
}
