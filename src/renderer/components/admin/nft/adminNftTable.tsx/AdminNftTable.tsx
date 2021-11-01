import "./index.scss";

import "./index.scss";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import { INft, INftForm } from "../../../../api/types/globalData";
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
} from "@material-ui/core";

import { useState } from "react";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import moment from "moment";
import AdminNftModal from "./adminNftModal/AdminNftModal";

export default function AdminNftTable({ data }: { data: INft[] }): JSX.Element {
  const [modal, setModal] = useState(false);

  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState<INftForm>({
    ticketPrice: 0,
    endDate: "",
    prizes: [],
    id: "",
    status: "draft",
  });
  const [currentIndex, setCurrentIndex] = useState(0);

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
              <StyledTableCell align="left">Ticket Price</StyledTableCell>
              <StyledTableCell align="left">Due Date</StyledTableCell>
              <StyledTableCell align="left">Number of tickets</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: INft, index: number) => (
              <TableRow className="tableRow" key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.ticketPrice}
                </StyledTableCell>

                <StyledTableCell align="left">
                  {moment(row.endDate).format("MMM Do YY")}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.tickets.length}
                </StyledTableCell>
                <StyledTableCell align="left">{row.status}</StyledTableCell>
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
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AdminNftModal
        open={modal}
        edit={edit}
        onClose={() => setModal(false)}
        {...(edit && { data: editData, index: currentIndex })}
      />
    </>
  );
}
