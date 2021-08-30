import "./index.scss";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import { useState } from "react";
import { IAdminUser } from "../../../../api/types/AdminData";
import AdminUsersModal from "./adminUsersModal/AdminUsersModal";
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

import EditRoundedIcon from "@material-ui/icons/EditRounded";

export default function AdminUsersTable({
  data,
}: {
  data: IAdminUser[];
}): JSX.Element {
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

  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState<IAdminUser>({
    username: "",
    admin: false,
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const addUser = () => {
    setModal(true);
    setEdit(false);
  };

  const handleAdminChange = ({
    username,
    admin,
    index,
  }: {
    username: string;
    admin: boolean;
    index: number;
  }) => {
    console.log("hola");
  };
  return (
    <>
      <button onClick={() => addUser()} className="gradientBg addCharityButton">
        <p>Add User</p> <AddCircleRoundedIcon />
      </button>
      <TableContainer component={StyledPaper}>
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell align="center">Admin</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: IAdminUser, index: number) => (
              <TableRow className="tableRow" key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.username}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Switch
                    onClick={(e) => e.stopPropagation()}
                    checked={row.admin}
                    onChange={(e) =>
                      handleAdminChange({
                        username: row.username,
                        admin: e.target.checked,
                        index,
                      })
                    }
                    color="primary"
                    name={row.username}
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
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
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AdminUsersModal
        open={modal}
        onClose={() => setModal(false)}
        edit={edit}
      />
    </>
  );
}
