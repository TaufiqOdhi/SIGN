import React from 'react';
import Async from 'react-async';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const params = window.location.href;
//disesuaikan denagn link aplikasi
var username = params.split("https://sign-e15cc.firebaseapp.com/detail?username=");
var APILink = 'https://us-central1-sign-e15cc.cloudfunctions.net/server/getScores?username='+username[1];

const rows = () =>//disesuaikan denagn link API
    fetch(APILink).then(res => res.json())

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTablesDetail() {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Game</StyledTableCell>
            <StyledTableCell align="center">Finish Score</StyledTableCell>
            <StyledTableCell align="center">TimeScore</StyledTableCell>
          </TableRow>
        </TableHead>
        <Async promiseFn={rows}>
          <Async.Loading>Loading.....</Async.Loading>
          <Async.Resolved>
            {data=>{
              return(
                <TableBody>
                  {data.map(row => (
                    <StyledTableRow key={row.no}>
                      <StyledTableCell component="th" scope="row">
                        {row.no}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.finishscore}</StyledTableCell>
                      <StyledTableCell align="center">{row.timescore}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              )
            }}
          </Async.Resolved>
          <Async.Rejected>
            {error=> `Something went wrong: ${error.message}`}
          </Async.Rejected>
        </Async>
      </Table>
    </TableContainer>
  );
}
