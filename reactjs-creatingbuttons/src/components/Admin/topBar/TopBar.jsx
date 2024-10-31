import { Box, IconButton, InputBase } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const TopBar = () => {
  return (
    <Box display="flex" justifyContent="space-between" p={2} alignItems="center" backgroundColor= "#028090">
      {/* SEARCH BAR */}
      <Box
        display="flex"
        alignItems="center"
        backgroundColor="#f0f0f0"  // Add background color for visibility
        borderRadius="3px"
        sx={{ width: "300px" }}  // Set a fixed width for the search bar
        marginRight="800px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ADD SPACE IN THE MIDDLE */}
      <Box sx={{ flexGrow: 1 }} /> {/* This will create space between the search and icons */}

      {/* ICONS */}
      <Box display="flex" alignItems="center">
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopBar;
