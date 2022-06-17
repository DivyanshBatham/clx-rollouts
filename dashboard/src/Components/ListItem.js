import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";


export default function ListItem(props) {
  return (
    <TableRow key={props.property} >
      <TableCell
        style={props.propertyStyle}
        component="th"
        scope="row"
        align="center"
      >
        {props.property} 
      </TableCell>
      <TableCell align="center" style={props.detailStyle}>{props.detail}</TableCell>
    </TableRow>
  );
}
