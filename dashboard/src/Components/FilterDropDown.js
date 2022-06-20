import { Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Menu from "@mui/material/Menu";
import Slide from "@mui/material/Slide";
function BasicSelect(props) {
  const { dropdownProperty, dropdownItems, setIndex } = props;
  return (
    <Box style={{ width: "15vw" }}>
      <FormControl fullWidth required>
        <InputLabel id="demo-simple-select-label">
          {dropdownProperty}
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select"
          //   value={age}
          defaultValue={dropdownItems[0]}
          label={dropdownProperty}
          // onChange={handleChange}
        >
          <MenuItem value=""></MenuItem>
          {dropdownItems.map((item, index) => {
            return (
              <MenuItem
                onClick={() => setIndex(index)}
                value={item}
                key={index}
              >
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
export default function FilterDropDown(props) {
  const { style, filters, selectedFilters, setSelectedFilters, onApply } =
    props;
  const [anchor, setAnchor] = useState(null);

  const [selected, setSelected] = useState(0);

  const openMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchor(null);
  };

  const onMenuItemClick = (event, index) => {
    setSelected(index);
  };

  const handleClick = () => {
    setAnchor(null);
    onApply();
  };
  const filterTypeOptions = filters.map((a) => a.filterType);
  return (
    <div style={style}>
      <Button
        variant="contained"
        startIcon={<FilterListIcon />}
        onClick={openMenu}
      >
        Filters
      </Button>
      <Menu
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={closeMenu}
        keepMounted
        TransitionComponent={Slide}
      >
        {filterTypeOptions.map((filterType, index) => (
          <MenuItem
            key={index}
            onClick={(event) => onMenuItemClick(event, index)}
            selected={index === selected}
          >
            <BasicSelect
              dropdownProperty={filterType}
              dropdownItems={filters[index].filterOptions}
              setIndex={(index) =>
                setSelectedFilters({ ...selectedFilters, [filterType]: index })
              }
            />
          </MenuItem>
        ))}
        <Button
          variant="contained"
          style={{ float: "right", margin: "2% 4% 4% 2%" }}
          onClick={handleClick}
        >
          Apply
        </Button>
      </Menu>
    </div>
  );
}
