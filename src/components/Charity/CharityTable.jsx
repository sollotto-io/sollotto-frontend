import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import { useHistory } from 'react-router';

const StyledTableCell = withStyles({
  root: {
    backgroundColor: 'transparent',
    color: 'white',
    margin: 0,
    padding: '10px 15px 10px 15px',
  },
})(TableCell);
const StyledPaper = withStyles({
  root: {
    borderRadius: 0,
  },
})(Paper);

export default function CharityTable({ rows }) {
  const history = useHistory();
  const poolDetails = (param) => {
    history.push(`/charities/${param}`);
  };

  return (
    <TableContainer component={StyledPaper}>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Charity Name</StyledTableCell>
            <StyledTableCell align="center">
              Current Votes <i>(Coming Soon)</i>
            </StyledTableCell>
            <StyledTableCell align="center">Added By</StyledTableCell>
            <StyledTableCell align="center">
              Lifetime Votes <i>(Coming Soon)</i>
            </StyledTableCell>
            <StyledTableCell align="center">
              Total Contribution <i>(Coming Soon)</i>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow onClick={() => poolDetails(row.charityName)} className="tableRow" key={index}>
              <StyledTableCell component="th" scope="row">
                {row.charityName}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.currentVotes ? row.currentVotes : '0'}
              </StyledTableCell>

              <StyledTableCell align="center">
                <p id="addedBy-Table" className="gradientBg gradientBorder">
                  SolLotto
                </p>
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.lifeTimeVotes ? row.lifeTimeVotes : '0'}
              </StyledTableCell>
              <StyledTableCell align="center">
                {' '}
                {row.lifeTimeVotes ? row.lifeTimeVotes : '0'}
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
