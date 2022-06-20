import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Slide from "@mui/material/Slide";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
export default function DropDownMenu(props) {
    const [anchor, setAnchor] = useState(null);

    const [selected, setSelected] = useState(0);

    const openMenu = (event) => {
        setAnchor(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchor(null);
    };

    const [currentOption,setCurrentOption] = useState(props.currentOption);
    const onMenuItemClick = (event, index) => {
        setAnchor(null);
        setSelected(index);
        setCurrentOption(props.options[index]);
        props.onChange(index);
    };
    return (
        <div style={props.style}>
            <Button 
            variant="contained"
            onClick={openMenu}
            endIcon={<KeyboardArrowDownIcon />}
            >
                {currentOption}
            </Button>
            <Menu
                open={Boolean(anchor)}
                anchorEl={anchor}
                onClose={closeMenu}
                keepMounted
                TransitionComponent={Slide}
            >
            {props.options.map((option, index) => (
            <MenuItem
                key={index}
                onClick={(event) => onMenuItemClick(event, index)}
                selected={index === selected}
            >
                {option}
            </MenuItem>
            ))}
      </Menu>

        </div>
    );
}