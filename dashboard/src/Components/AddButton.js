import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
export default function AddButton(props) {
  const {style, handleClick} = props;
  return (
    <div style={style}>
      <Button variant="contained" onClick={handleClick}>
        <AddIcon />
      </Button>
    </div>
  );
}
