import IconButton from "@mui/material/IconButton";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

export default function AddButton(props) {
  const { style, handleClick, toolTipTitle } = props;
  return (
    <div style={style}>
      <Tooltip title={toolTipTitle}>
        <Button
          variant="outlined"
          onClick={handleClick}
          startIcon={<AddSharpIcon />}
        >
          Create
        </Button>
      </Tooltip>
    </div>
  );
}
