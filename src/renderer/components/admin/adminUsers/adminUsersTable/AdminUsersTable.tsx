import "./index.scss";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import SyncIcon from "@material-ui/icons/Sync";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { useState } from "react";
import { IAdminUser } from "../../../../api/types/AdminData";
import AdminUsersModal from "./adminUsersModal/AdminUsersModal";
import AdminUsersDeleteModal from "./adminUsersDeleteModal/AdminUsersDeleteModal";
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
import { useMutation } from "@apollo/react-hooks";
import { CHANGE_ADMIN_USER_ROLE } from "../../../../../graphql/mutations";
import useTypedReduxState from "../../../../hooks/useTypedReduxState";

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
  const [passwordChange, setPasswordChange] = useState(false);
  const [editData, setEditData] = useState<IAdminUser>({
    id: "",
    username: "",
    admin: false,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userDelete, setUserDelete] = useState({
    status: false,
    id: "",
  });
  const [{ adminUsers }, setAdminUser] = useTypedReduxState(
    (state) => state.globalData
  );

  const [changeUserRole] = useMutation(CHANGE_ADMIN_USER_ROLE, {
    onCompleted: (e) => {
      const users = [...adminUsers.users];
      const index = users.findIndex((us) => us.id === e.updateUserRole.id);
      if (index !== -1) {
        users[index] = e.updateUserRole;
        setAdminUser({
          type: "SET_GLOBAL_DATA",
          arg: {
            adminUsers: {
              ...adminUsers,
              users: [...users],
            },
          },
        });
      }
    },
    onError: (e) => console.log(e),
  });

  const addUser = () => {
    setModal(true);
    setEdit(false);
  };

  const handleAdminChange = ({
    id,
    admin,
  }: {
    id: string;
    admin: boolean;
    index: number;
  }) => {
    changeUserRole({
      variables: {
        id: id,
        admin: admin,
      },
    });
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
              <StyledTableCell align="center">Change Password</StyledTableCell>
              <StyledTableCell align="center">Delete User</StyledTableCell>
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
                        id: row.id,
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
                      setPasswordChange(false);
                      setModal(true);
                    }}
                  >
                    <EditRoundedIcon className="edit-delete-button" />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    onClick={() => {
                      setEditData(row);
                      setPasswordChange(true);
                      setEdit(false);
                      setModal(true);
                    }}
                  >
                    <SyncIcon className="edit-delete-button" />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    onClick={() => {
                      setUserDelete({
                        id: row.id,
                        status: true,
                      });
                      setCurrentIndex(index);
                    }}
                  >
                    <CloseOutlinedIcon className="edit-delete-button" />
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
        data={editData}
        index={currentIndex}
        passwordChange={passwordChange}
      />
      <AdminUsersDeleteModal
        open={userDelete.status}
        onClose={() =>
          setUserDelete({
            status: false,
            id: "",
          })
        }
        id={userDelete.id}
        index={currentIndex}
      />
    </>
  );
}
