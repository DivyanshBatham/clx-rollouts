import {
  Box,
  Stack,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Button,
} from "@mui/material";
function BasicSelect(props) {
  const { dropdownProperty, defaultValue, dropdownItems, setIndex } = props;
  return (
    <Box style={{ width: "8vw" }}>
      <FormControl fullWidth required>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select"
          defaultValue={dropdownItems[defaultValue]}
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

export default function Filter(props) {
  const { style, filters, selectedFilters, setSelectedFilters, onApply } =
    props;
  const filterTypeOptions = filters.map((a) => a.filterType);
  return (
    <div style={style}>
      <Stack direction="row" spacing={3}>
        {filterTypeOptions.map((filterType, index) => (
          <BasicSelect
            key={index}
            dropdownProperty={filterType}
            dropdownItems={filters[index].filterOptions}
            defaultValue={selectedFilters[filterType]}
            setIndex={(index) =>
              setSelectedFilters({ ...selectedFilters, [filterType]: index })
            }
          />
        ))}
      </Stack>
    </div>
  );
}
