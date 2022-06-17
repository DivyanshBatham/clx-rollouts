import SearchBar from "material-ui-search-bar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
export default function Search(props) {
  return (
    <div style={props.style}>
      <SearchBar
        className="search"
        value={props.searchText}
        onChange={(value) => props.setSearchText(value)}
        onRequestSearch = {props.onSearch}
        placeholder="Search..."
        closeIcon={
          <IconButton onClick={() => props.setSearchText("")}>
            <CloseIcon />
          </IconButton>
        }
        autoFocus
      />
    </div>
  );
}
