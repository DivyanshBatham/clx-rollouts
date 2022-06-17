import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import ListItem from "./ListItem";

export default function CustomizedTables(props) {
  const classes = props.tableStyles;
  return (
    <TableContainer component={Paper}>
      {/* Receive the experiment name as prop */}
      <Table className={classes.table} aria-label="customized table">
        <TableHead></TableHead>
        <TableBody>
          {props.dummyDetails.map((row) => (
            <ListItem {...row} propertyStyle = {props.propertyStyle} detailStyle = {props.detailStyle}  />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
