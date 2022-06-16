// import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
export default function AddButton(props) {
  return (
    <div style={props.style}>
      <button onClick={props.onClick}>
        <AddIcon />
      </button>
    </div>
  );
}
