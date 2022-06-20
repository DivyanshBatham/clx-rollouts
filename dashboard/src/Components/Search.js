import SearchIcon from "@mui/icons-material/Search";
import TextField from '@mui/material/TextField';
import InputAdornment from "@mui/material/InputAdornment"

export default function Search(props) {

  const {searchText, setSearchText, onSearch} = props;
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch();
    setSearchText("");
  }
  return (
  <div style={props.style}>
    <form onSubmit={handleSubmit}>
      <TextField
        id="search-bar"
        className="text"
        value = {searchText}
        onInput={(e) => {
        setSearchText(e.target.value);
        }}
        variant="outlined"
        placeholder="Search..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          )
        }}
        fullWidth
      />
    </form>
  </div>
  );
}
