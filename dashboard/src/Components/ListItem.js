import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";


export default function ListItem(props) {
  return (
    <TableRow key={props.property} style = {{border: '1px solid black'}} >
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
