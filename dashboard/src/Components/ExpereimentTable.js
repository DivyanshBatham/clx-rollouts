import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Hamburger from "./Components/Hamburger.js";
export default function ExperimentRow(props) {
  return (
    <div style={props.style}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Created By</TableCell>
              <TableCell align="left">Created at</TableCell>
              <TableCell align="left">updated at</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <TableRow key={row.name}>
                <div onClick={props.onExperimentClick}>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.createdBy}</TableCell>
                  <TableCell align="left">{row.createdAt}</TableCell>
                  <TableCell align="left">{row.updatedAt}</TableCell>
                  <TableCell align="left">{row.status}</TableCell>
                </div>
                <TableCell>
                  <Hamburger onHamClick={props.onHamClick} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
