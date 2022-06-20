import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import ListItem from "./ListItem";

export default function CustomizedTables(props) {
  return (
    <TableContainer
      component={Paper}
      style={{ width: "90%", marginLeft: "5%" }}
    >
      {/* Receive the experiment name as prop */}
      <Table aria-label="customized table">
        <TableHead></TableHead>
        <TableBody>
          {props.dummyDetails.map((row) => (
            <ListItem
              {...row}
              propertyStyle={props.propertyStyle}
              detailStyle={props.detailStyle}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
