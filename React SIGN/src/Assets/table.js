import React from 'react';
import Async from 'react-async';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Link } from '@material-ui/core';
import './tableDetail';

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const loadData = () =>//disesuaikan dengan link API
    fetch("https://us-central1-sign-e15cc.cloudfunctions.net/server/getData").then(res => res.json())

function Tables() {
  const classes = useStyles();
  return (
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Username</StyledTableCell>
            <StyledTableCell align="center">Nama</StyledTableCell>
            <StyledTableCell align="center">Asal Sekolah</StyledTableCell>
            <StyledTableCell align="center">Finish Score</StyledTableCell>
            <StyledTableCell align="center">TimeScore</StyledTableCell>
            <StyledTableCell align="center">Detail</StyledTableCell>
            <StyledTableCell align="center">Certificate</StyledTableCell>
          </TableRow>
        </TableHead>
          <Async promiseFn={loadData}>
            <Async.Loading>Loading...</Async.Loading>
            <Async.Resolved>
              {data=>{
                return(
                  <TableBody>
                  {data.map(row => (
                    <StyledTableRow >
                    <StyledTableCell component="th">
                    {row.username}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.nama}</StyledTableCell>
                    <StyledTableCell align="left">{row.asalSekolah}</StyledTableCell>
                    <StyledTableCell align="center">{row.finishscore}</StyledTableCell>
                    <StyledTableCell align="center">{row.timescore}</StyledTableCell>
                    <StyledTableCell align="center"><Link href={'/detail?username='+row.username}><Button>Detail</Button></Link></StyledTableCell>
                    <StyledTableCell align="center"><Link href={'https://us-central1-sign-e15cc.cloudfunctions.net/server?username='+row.username} target="_blank"><Button color="primary">Open</Button></Link></StyledTableCell>
                    </StyledTableRow>
                  ))}
                  </TableBody>
                )
              }}
            </Async.Resolved>
            <Async.Rejected>
              {error => `Something went wrong: ${error.message}`}
            </Async.Rejected>
        </Async>
        </Table>
      </TableContainer>
    );
}

export default Tables;
