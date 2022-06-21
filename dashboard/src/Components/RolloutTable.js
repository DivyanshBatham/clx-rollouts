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
                Type
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Level
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Status
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Created By
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id} hover>
                <TableCell
                  onClick={() => onRolloutClick(index)}
                  style={{ cursor: "pointer" }}
                  align="center"
                >
                  {row.rollout_name}
                </TableCell>
                <TableCell
                  onClick={() => onRolloutClick(index)}
                  style={{ cursor: "pointer" }}
                  align="center"
                >
                  {type_list[row.rollout_type - 1]}
                </TableCell>
                <TableCell
                  onClick={() => onRolloutClick(index)}
                  style={{ cursor: "pointer" }}
                  align="center"
                >
                  {level_list[row.rollout_level - 1]}
                </TableCell>
                <TableCell
                  onClick={() => onRolloutClick(index)}
                  style={{ cursor: "pointer" }}
                  align="center"
                >
                  {status_list[row.rollout_status]}
                </TableCell>
                <TableCell
                  onClick={() => onRolloutClick(index)}
                  style={{ cursor: "pointer" }}
                  align="center"
                >
                  {row.created_by}
                </TableCell>
                <TableCell align="right">
                  <ThreeDotDropDown
                    options={options}
                    intialOption={row.status}
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
