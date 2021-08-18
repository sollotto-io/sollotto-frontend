import "./AdminCharity.scss";
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
import { useHistory } from "react-router";
import { ICharity } from "../../../api/types/globalData";
import { useMutation } from "@apollo/react-hooks";
import { CHARITY_STATUS_CHAGED } from "../../../../graphql/mutations";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import CRUDModal from "./CRUDModal/CRUDModal";
import { useEffect, useState } from "react";
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

export default function CharityAdminTable({
  rows,
}: {
  rows: ICharity[];
}): JSX.Element {
  const [changeStatus] = useMutation(CHARITY_STATUS_CHAGED);
  const [globalData, setGlobalData] = useReduxState(
    (state) => state.globalData
  );
  const [modalState, setModalState] = useState({
    state: false,
    type: false,
    id: "",
  });
  const [state, setState] = useState(false);
  useEffect(() => {
    (async () => {
      const newCharities = await globalData.charities.refetch();
      if (newCharities) {
        setGlobalData({
          type: "SET_GLOBAL_DATA",
          arg: {
            charities: {
              ...globalData.charities,
              charities: newCharities.data.getAllCharities,
            },
          },
        });
      }
    })();
  }, [state, modalState]);

  const history = useHistory();
  const poolDetails = (param: string) => {
    history.push({
      pathname: `/charities/${param}`,
      state: { fromPurchase: false, fromAdmin: true },
    });
  };
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
  const handleCharityStatus = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    await changeStatus({
      variables: {
        charityId: id,
        Status: event.target.checked,
      },
    });
    setState(!state);
  };

  return (
    <>
      <button
        onClick={(e) => handleModalState(e, true, "")}
        className="gradientBg addCharityButton"
      >
        <p>Add Charity</p> <AddCircleRoundedIcon />
      </button>
      <TableContainer component={StyledPaper}>
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Charity Name</StyledTableCell>
              <StyledTableCell align="center">PublicKey</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
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

                <StyledTableCell align="left">{row.publicKey}</StyledTableCell>
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
                      handleCharityStatus(e, row.id);
                    }}
                    color="primary"
                    name={row.charityName}
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CRUDModal
        modalState={modalState.state}
        modalType={modalState.type}
        handleModalClose={handleModalClose}
        id={modalState.id}
      />
    </>
  );
}
