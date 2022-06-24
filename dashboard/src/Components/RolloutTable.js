import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import ThreeDotDropDown from "./ThreeDotDropDown";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";

export default function RolloutTable(props) {
  const {
    style,
    rows,
    onRolloutClick,
    options,
    rolloutOnChange,
    sortProperties,
    setSortProperties,
    pageOffset,
    setPageOffset,
  } = props;
  const status_list = [
    "Created",
    "Live",
    "Success",
    "Cancelled",
    "Failed",
    "Paused",
  ];
  // const STATUS = {
  //   CREATED: 0,
  //   LIVE: 1,
  //   SU
  // }
  const level_list = ["Goal", "Class", "Educator", "Course"];
  const type_list = ["Frontend", "Backend"];
  // const nextStatusOptionIndexes = {
  //   0: [1, 3],
  //   1: [2, 4, 5],
  //   2: [],
  //   3: [],
  //   4: [],
  //   5: [1, 3],
  // };
  const [nextStatusOptionIndexes, setNextStatusOptionIndexes] = useState({
    0: [1, 3],
    1: [2, 4, 5],
    2: [],
    3: [],
    4: [],
    5: [1, 3],
  });
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("Name");
  const [page, setPage] = useState(1);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setSortProperties({
      ...sortProperties,
      property: property,
      order: order,
    });
    console.log("Request to sort table with " + property + " in " + isAsc);
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/rollout/next_status`)
      .then((res) => {
        // console.log(res.data.data);
        setNextStatusOptionIndexes(res.data.data);
      });
  }, []);
  const handleChangePage = (e, p) => {
    console.log(p);
    setPage(p);
    let offset = (p - 1) * pageOffset.limit;
    setPageOffset({ ...pageOffset, offset: offset });
    console.log(pageOffset);
  };
  return (
    <div style={style}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: "#E1E5EA" }}>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                <TableSortLabel
                  active={orderBy === "rollout_name"}
                  direction={orderBy === "rollout_name" ? order : "asc"}
                  onClick={(event) => {
                    handleRequestSort(event, "rollout_name");
                  }}
                >
                  NAME
                  {orderBy === "rollout_name" ? (
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
                  active={orderBy === "rollout_type"}
                  direction={orderBy === "rollout_type" ? order : "asc"}
                  onClick={(event) => {
                    handleRequestSort(event, "rollout_type");
                  }}
                >
                  TYPE
                  {orderBy === "rollout_type" ? (
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
                  active={orderBy === "rollout_level"}
                  direction={orderBy === "rollout_level" ? order : "asc"}
                  onClick={(event) => {
                    handleRequestSort(event, "rollout_level");
                  }}
                >
                  LEVEL
                  {orderBy === "rollout_level" ? (
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
                  active={orderBy === "rollout_status"}
                  direction={orderBy === "rollout_status" ? order : "asc"}
                  onClick={(event) => {
                    handleRequestSort(event, "rollout_status");
                  }}
                >
                  STATUS
                  {orderBy === "rollout_status" ? (
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
                  active={orderBy === "created_by"}
                  direction={orderBy === "created_by" ? order : "asc"}
                  onClick={(event) => {
                    handleRequestSort(event, "created_by");
                  }}
                >
                  CREATED BY
                  {orderBy === "created_by" ? (
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
                  active={orderBy === "created_at"}
                  direction={orderBy === "created_at" ? order : "asc"}
                  onClick={(event) => {
                    handleRequestSort(event, "created_at");
                  }}
                >
                  CREATED AT
                  {orderBy === "created_at" ? (
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
                  {new Date(row.created_at).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  <ThreeDotDropDown
                    options={options}
                    nextStatusOptionIndexes={nextStatusOptionIndexes}
                    currentStatusIndex={row.rollout_status}
                    intialOption={row.status}
                    onChange={(optionIndex) => {
                      rolloutOnChange(row.id, row.rollout_name, optionIndex);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={-1}
                rowsPerPage={-1}
                page={page}
                onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[]}
                labelRowsPerPage={<span></span>}
                labelDisplayedRows={({ page }) => {
                  return `Page: ${page}`;
                }}
                backIconButtonProps={{
                  color: "primary",
                }}
                nextIconButtonProps={{ color: "primary" }}
                SelectProps={{
                  inputProps: {
                    "aria-label": "page number",
                  },
                }}
                showFirstButton={true}
                showLastButton={true}
                //ActionsComponent={TablePaginationActions}
                //component={Box}
                //sx and classes prop discussed in styling section
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
