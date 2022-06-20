import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
export default function AddButton(props) {
  const {style, handleClick} = props;
  return (
    <div style={style}>
      <IconButton onClick={handleClick}>
        <AddIcon/>
      </IconButton>
        
    </div>
  );
}
