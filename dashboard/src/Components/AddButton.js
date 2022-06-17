import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
export default function AddButton(props) {
  return (
    <div style={props.style}>
      <Button onClick={props.onClick}>
        <AddIcon />
      </Button>
    </div>
  );
}
