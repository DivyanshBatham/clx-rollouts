import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import ThreeDotDropDown from "./ThreeDotDropDown";
export default function RolloutTable(props) {
  const {style, rows, onRolloutClick, options , rolloutOnChange} = props;
  return (
    <div style={style}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Created By</TableCell>
              <TableCell align="center">Created at</TableCell>
              <TableCell align="center">updated at</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row,index) => (
              <TableRow
              key={row.name}
              hover
              >
                    <TableCell onClick={() => onRolloutClick(index)} align="center">{row.name}</TableCell>
                    <TableCell onClick={() => onRolloutClick(index)} align="center">{row.createdBy}</TableCell>
                    <TableCell onClick={() => onRolloutClick(index)} align="center">{row.createdAt}</TableCell>
                    <TableCell onClick={() => onRolloutClick(index)} align="center">{row.updatedAt}</TableCell>
                    <TableCell onClick={() => onRolloutClick(index)} align="center">{row.status}</TableCell>
                    <TableCell align="right">
                      <ThreeDotDropDown options={options}
                        intialOption = {row.status}
                        onChange = {(optionIndex) => {
                        rolloutOnChange(index,optionIndex);
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
