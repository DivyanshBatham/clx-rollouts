import { withStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 17
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

export default function ListItem(props) {
  return (
    <StyledTableRow key={props.name}>
      <StyledTableCell
        style={{ fontFamily: "sans-serif" }}
        component="th"
        scope="row"
      >
        {props.name} :
      </StyledTableCell>
      <StyledTableCell align="right">{props.calories}</StyledTableCell>
    </StyledTableRow>
  );
}
