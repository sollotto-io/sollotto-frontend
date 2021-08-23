import "./index.scss";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import { IPool } from "../../../../api/types/globalData";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_POOL_STATUS } from "../../../../../graphql/mutations";
import {
  TableHead,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  withStyles,
  Paper,
  Switch,
} from "@material-ui/core";
import PoolTableModal from "./poolTableModal/PoolTableModal";
import { useState } from "react";
import useReduxState from "../../../../hooks/useReduxState";
import Countdown from "react-countdown";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

export default function AdminPoolTable({
  data,
}: {
  data: IPool[];
}): JSX.Element {
  const [modal, setModal] = useState(false);
  const [{ pools }, setGlobalState] = useReduxState(
    (state) => state.globalData
  );

  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState<IPool>({
    tokenAddress: "",
    tokenLogo: "",
    id: "",
    tokenName: "",
    dueDate: new Date(Date.now()).toDateString(),
    status: true,
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const [updatePoolStatus] = useMutation(UPDATE_POOL_STATUS);
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

  const HandleModal = () => {
    setModal(!modal);
    setEdit(false);
  };

  const handleStatusChange = ({
    id,
    status,
    index,
  }: {
    id: string;
    status: boolean;
    index: number;
  }) => {
    (async () => {
      const newPool = await updatePoolStatus({
        variables: { id: id, status: status },
      });
      if (newPool && newPool.data.changePoolStatus) {
        console.log(newPool);
        const poolsArr = [...pools.pools];
        poolsArr[index] = newPool.data.changePoolStatus;
        setGlobalState({
          type: "SET_GLOBAL_DATA",
          arg: {
            pools: {
              ...pools,
              pools: [...poolsArr],
            },
          },
        });
      }
    })();
  };
  return (
    <>
      <button
        onClick={() => HandleModal()}
        className="gradientBg addCharityButton"
      >
        <p>Add Pool</p> <AddCircleRoundedIcon />
      </button>
      <TableContainer component={StyledPaper}>
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Pool Name</StyledTableCell>
              <StyledTableCell align="left">Address</StyledTableCell>
              <StyledTableCell align="left">DueDate</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: IPool, index: number) => (
              
              <TableRow className="tableRow" key={index}>
                <StyledTableCell component="th" scope="row">
                  <div className="apt-tokenName">
                    <img
                      src={`${process.env.REACT_APP_IMAGE_LINK}${row.tokenLogo}`}
                      alt="logo"
                    />
                    {row.tokenName}
                  </div>
                </StyledTableCell>

                <StyledTableCell component="th" align="left">
                  {row.tokenAddress}
                </StyledTableCell>
                <StyledTableCell align="left"><Countdown date={parseInt(row.dueDate)} /></StyledTableCell>
                <StyledTableCell
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <IconButton
                    onClick={() => {
                      setEditData(row);
                      setEdit(true);
                      setCurrentIndex(index);
                      setModal(true);
                    }}
                  >
                    <EditRoundedIcon className="edit-delete-button" />
                  </IconButton>
                  <Switch
                    onClick={(e) => e.stopPropagation()}
                    checked={row.status}
                    onChange={(e) =>
                      handleStatusChange({
                        id: row.id,
                        status: e.target.checked,
                        index,
                      })
                    }
                    color="primary"
                    name={row.tokenName}
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PoolTableModal
        open={modal}
        edit={edit}
        onClose={() => setModal(false)}
        {...(edit && { data: editData, index: currentIndex })}
      />
    </>
  );
}
