import "./styles.css";
import { useState } from "react";
import Dashboard from "./Pages/Dashboard";
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
  
  // const options= ["All","Class","Educator","Goal"];
  const options = ["Live","Cancelled","Paused","Failed","Created","Success"];
  const [currentOption,setCurrentOption] = useState(options[0]);
  const rows = [
    {"name" : "abc","createdBy" : "Venu", "createdAt" : "13-07-2002","updatedAt" : "13-07-2002","status" : "Live"},
    {"name" : "adsbc","createdBy" : "Venu", "createdAt" : "13-07-2002","updatedAt" : "13-07-2002","status" : "Live"},
    {"name" : "abdsac","createdBy" : "Venu", "createdAt" : "13-07-2002","updatedAt" : "13-07-2002","status" : "Cancelled"},
    {"name" : "abdsadc","createdBy" : "Venu", "createdAt" : "13-07-2002","updatedAt" : "13-07-2002","status" : "Success"}
  ]

  const filters = [{"filterType" : "status","filterOptions" : ["All","Live","Cancelled","Paused","Failure","Created"]},
                    {"filterType" : "type","filterOptions" : ["All","Feature","Deployment"]},
                    {"filterType" : "level","filterOptions" : ["All","Goal","Class","Educator","Course"]}
]
const [selectedFilters,setSelectedFilters] = useState(
  {"status" : 0, "type" : 0, "level" : 0}
  );
  return (
    <div>
      {/* <Search 
      searchText ={searchText}
      setSearchText ={setSearchText}
      onSearch = {() => console.log(searchText + " is searched.")}
      />
      <DropDownMenu
        options = {options}
        currentOption = {currentOption}
        onChange = {
          (index) => {
          console.log(options[index])
        }
        }
      />
      <AddButton onClick = {() => console.log("add button clicked.")}/>
      <RolloutTable
        options = {options}
        rows = {rows}
        onRolloutClick = {(index) => console.log(rows[index].name + " got clicked")}
        rolloutOnChange = {(index,optionIndex) => console.log(rows[index].name + " got "+ options[optionIndex])}
      />

      <FilterDropDown
      filters = {filters}
      selectedFilters = {selectedFilters}
      setSelectedFilters = {setSelectedFilters}
      /> */}
      <Dashboard />
    </div>
  );
}
