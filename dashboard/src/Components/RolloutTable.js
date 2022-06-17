import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import DropDownMenu from "./DropDownMenu";
export default function RolloutTable(props) {

  return (
    <div style={props.style}>
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
            {props.rows.map((row,index) => (
              <TableRow
              key={row.name}
              >
                    <TableCell onClick={() => props.onRolloutClick(index)} align="center">{row.name}</TableCell>
                    <TableCell onClick={() => props.onRolloutClick(index)} align="center">{row.createdBy}</TableCell>
                    <TableCell onClick={() => props.onRolloutClick(index)} align="center">{row.createdAt}</TableCell>
                    <TableCell onClick={() => props.onRolloutClick(index)} align="center">{row.updatedAt}</TableCell>
                    <TableCell align="center">
                      <DropDownMenu options={props.options}
                        currentOption = {row.status}
                        onChange = {(optionIndex) => {
                        props.rolloutOnChange(index,optionIndex);
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
