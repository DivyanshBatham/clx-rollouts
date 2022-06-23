import React, { useState } from "react";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import ThreeDotDropDown from "./ThreeDotDropDown";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";

export default function RolloutTable(props) {
  const { style, rows, onRolloutClick, options, rolloutOnChange } = props;
  const status_list = [
    "Created",
    "Live",
    "Success",
    "Cancelled",
    "Paused",
    "Failed",
  ];
  const level_list = ["Goal", "Class", "Educator", "Course"];
  const type_list = ["Feature", "Deployment"];
  const nextStatusOptionIndexes = {
    0: [1, 3],
    1: [2, 4, 5],
    2: [],
    3: [],
    4: [1, 3],
    5: [],
  };
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Name");
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    console.log("Request to sort table with " + property + " in " + isAsc);
  };
  return (
    <div style={style}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: "#E1E5EA" }}>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                <TableSortLabel
                  active={orderBy === "NAME"}
                  direction={orderBy === "NAME" ? order : "asc"}
                  onClick={(event) => {
                    handleRequestSort(event, "NAME");
                  }}
                >
                  NAME
                  {orderBy === "NAME" ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                <TableSortLabel
                  active={orderBy === "TYPE"}
                  direction={orderBy === "TYPE" ? order : "asc"}
                  onClick={(event) => {
                    handleRequestSort(event, "TYPE");
                  }}
                >
                  TYPE
                  {orderBy === "TYPE" ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                <TableSortLabel
                  active={orderBy === "LEVEL"}
                  direction={orderBy === "LEVEL" ? order : "asc"}
                  onClick={(event) => {
                    handleRequestSort(event, "LEVEL");
                  }}
                >
                  LEVEL
                  {orderBy === "LEVEL" ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                <TableSortLabel
                  active={orderBy === "STATUS"}
                  direction={orderBy === "STATUS" ? order : "asc"}
                  onClick={(event) => {
                    handleRequestSort(event, "STATUS");
                  }}
                >
                  STATUS
                  {orderBy === "STATUS" ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                <TableSortLabel
                  active={orderBy === "CREATED BY"}
                  direction={orderBy === "CREATED BY" ? order : "asc"}
                  onClick={(event) => {
                    handleRequestSort(event, "CREATED BY");
                  }}
                >
                  CREATED BY
                  {orderBy === "CREATED BY" ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                <TableSortLabel
                  active={orderBy === "CREATED AT"}
                  direction={orderBy === "CREATED AT" ? order : "asc"}
                  onClick={(event) => {
                    handleRequestSort(event, "CREATED AT");
                  }}
                >
                  CREATED AT
                  {orderBy === "CREATED AT" ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id} hover>
                <TableCell
                  onClick={() => onRolloutClick(row.id)}
                  style={{ cursor: "pointer" }}
                  align="center"
                >
                  {row.rollout_name}
                </TableCell>
                <TableCell
                  onClick={() => onRolloutClick(row.id)}
                  style={{ cursor: "pointer" }}
                  align="center"
                >
                  {type_list[row.rollout_type - 1]}
                </TableCell>
                <TableCell
                  onClick={() => onRolloutClick(row.id)}
                  style={{ cursor: "pointer" }}
                  align="center"
                >
                  {level_list[row.rollout_level - 1]}
                </TableCell>
                <TableCell
                  onClick={() => onRolloutClick(row.id)}
                  style={{ cursor: "pointer" }}
                  align="center"
                >
                  {status_list[row.rollout_status]}
                </TableCell>
                <TableCell
                  onClick={() => onRolloutClick(row.id)}
                  style={{ cursor: "pointer" }}
                  align="center"
                >
                  {row.created_by}
                </TableCell>
                <TableCell
                  onClick={() => onRolloutClick(row.id)}
                  style={{ cursor: "pointer" }}
                  align="center"
                >
                  {row.created_at}
                </TableCell>
                <TableCell align="right">
                  <ThreeDotDropDown
                    options={options}
                    nextStatusOptionIndexes={nextStatusOptionIndexes}
                    currentStatusIndex={row.rollout_status}
                    intialOption={row.status}
                    onChange={(optionIndex) => {
                      rolloutOnChange(row.id,row.rollout_name, optionIndex);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
