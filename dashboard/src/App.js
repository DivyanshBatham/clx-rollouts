import "./styles.css";
import List from "./Components/List.js";
import Search from "./Components/Search";
import AddButton from "./Components/AddButton";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import ActionPopup from "./Components/ActionPopup";
import Hamburger from "./Components/Hamburger.js";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [openOption, setopenOptions] = useState(false);
  const heading = "Are you sure?";
  const details = "Do you really want to delete this?";
  const handleClickOpen = () => {
    setOpen(true);
  };

  const onHamClick = () => {
    setopenOptions(true);
  };

  const rows = [{}, {}];
  return (
    <div className="App">
      <Search searchText={searchText} setSearchText={setSearchText} />
      <p>{searchText}</p>
      <AddButton
        onClick={() => {
          console.log("clicked");
        }}
      />
      <List
        property="Description"
        details="Run Ab testing on raise hand feature"
      />
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Make it Live
      </Button>
      <ActionPopup
        open={open}
        setOpen={setOpen}
        heading={heading}
        details={details}
      /> */}
      <Hamburger onHamClick={onHamClick} />
    </div>
  );
}
