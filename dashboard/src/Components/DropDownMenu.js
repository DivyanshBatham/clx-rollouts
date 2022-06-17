import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Slide from "@material-ui/core/Slide";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { useState } from "react";
import { styled, alpha } from "@material-ui/core/styles";
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