import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import ThreeDotDropDown from "./ThreeDotDropDown";
export default function RolloutTable(props) {
  const { style, rows, onRolloutClick, options, rolloutOnChange } = props;
  return (
    <div style={style}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Created By
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Created At
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Updated At
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.rollout_name} hover>
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
                  {row.created_by}
                </TableCell>
                <TableCell
                  onClick={() => onRolloutClick(row.id)}
                  style={{ cursor: "pointer" }}
                  align="center"
                >
                  {row.created_at}
                </TableCell>
                <TableCell
                  onClick={() => onRolloutClick(row.id)}
                  style={{ cursor: "pointer" }}
                  align="center"
                >
                  {row.updated_at}
                </TableCell>
                <TableCell
                  onClick={() => onRolloutClick(index)}
                  style={{ cursor: "pointer" }}
                  align="center"
                >
                  {row.rollout_status}
                </TableCell>
                <TableCell align="right">
                  <ThreeDotDropDown
                    options={options}
                    intialOption={row.rollout_status}
                    onChange={(optionIndex) => {
                      rolloutOnChange(index, optionIndex);
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
