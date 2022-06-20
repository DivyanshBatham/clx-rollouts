import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Slide from "@mui/material/Slide";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
export default function ThreeDotDropDown(props) {
    const {style, options, intialOption, onChange } = props;
    const [anchor, setAnchor] = useState(null);

    const [selected, setSelected] = useState(0);

    const openMenu = (event) => {
        setAnchor(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchor(null);
    };

    const [currentOption,setCurrentOption] = useState(intialOption);
    const onMenuItemClick = (event, index) => {
        setAnchor(null);
        setSelected(index);
        setCurrentOption(options[index]);
        onChange(index);
    };
    return (
        <div style={style}>
            <Button 
            onClick={openMenu}
            >
                <MoreVertIcon />
            </Button>
            <Menu
                open={Boolean(anchor)}
                anchorEl={anchor}
                onClose={closeMenu}
                keepMounted
                TransitionComponent={Slide}
            >
            {options.map((option, index) => (
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