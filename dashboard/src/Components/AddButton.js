import IconButton from "@mui/material/IconButton";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import Tooltip from "@mui/material/Tooltip";
export default function AddButton(props) {
  const { style, handleClick,toolTipTitle } = props;;
  return (
    <div style={style}>
      <Tooltip title={toolTipTitle}>
      <IconButton onClick={handleClick}>
        <AddSharpIcon />
      </IconButton>
      </Tooltip>
    </div>
  );
}
