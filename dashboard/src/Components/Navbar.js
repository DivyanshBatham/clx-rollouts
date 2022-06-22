import {
  AppBar,
  Toolbar,
  Box,
  Container,
  CssBaseline,
  Drawer,
  Typography,
} from "@mui/material";
import { ReactComponent as UnacademyLogo } from "../Assets/Unacademy-logo.svg";

export default function Navbar() {
  return (
    <Box component="nav">
      <AppBar position="static" style={{ backgroundColor: "#FCFCFC" }}>
        <Container maxWidth="lg">
          <Toolbar>
            <UnacademyLogo width={182} height={64} />
            {/* <Typography
                    variant="h4"
                    style={{
                        marginLeft: "1vw",
                        color: "#2d81f7",
                        fontWeight: "Bold",
                    }}
                    >
                    Rollouts
                    </Typography>
                    <Search
                    style={{ marginLeft: "15vw", width: "30vw" }}
                    searchText={searchText}
                    setSearchText={setSearchText}
                    onSearch={() => console.log(searchText + " is searched.")}
                    />
                    <FilterDropDown
                    style={{ marginLeft: "15vw" }}
                    filters={filters}
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                    onApply={onFilterApply}
                    />
                    <AddButton
                    style={{ marginLeft: "2vw" }}
                    toolTipTitle="Add a new Rollout"
                    handleClick={toggleCreateRolloutSlider}
                    />
                    <Drawer
                    open={createRolloutOpen}
                    anchor="right"
                    onClose={toggleCreateRolloutSlider}
                    >
                    {CreateRollout()}
                    </Drawer>

                    <Drawer
                    open={viewRolloutOpen}
                    anchor="right"
                    onClose={toggleViewRolloutSlider}
                    >
                    <ViewRollout
                        setEditRolloutOpen={setEditRolloutOpen}
                        setViewRolloutOpen={setViewRolloutOpen}
                        setViewConfigOpen={setViewConfigOpen}
                        isConfigured={isConfigured}
                        setCreateConfigOpen={setCreateConfigOpen}
                    />
                    </Drawer>

                    <Drawer
                    open={editRolloutOpen}
                    anchor="right"
                    onClose={() => setEditRolloutOpen(false)}
                    >
                    <EditRollout setEditRolloutOpen={setEditRolloutOpen} />
                    </Drawer>

                    <Drawer
                    open={viewConfigOpen}
                    anchor="right"
                    onClose={() => setViewConfigOpen(false)}
                    >
                    <ViewConfig
                        setEditConfigOpen={setEditConfigOpen}
                        setViewConfigOpen={setViewConfigOpen}
                    />
                    </Drawer>

                    <Drawer
                    open={createConfigOpen}
                    anchor="right"
                    onClose={() => setCreateConfigOpen(false)}
                    >
                    <CreateConfig />
                    </Drawer>
                    <Drawer
                    open={editConfigOpen}
                    anchor="right"
                    onClose={() => setEditConfigOpen(false)}
                    >
                    <EditConfig />
                    </Drawer> */}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
