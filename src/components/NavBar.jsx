import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.setItem("umbrage-access-token", "");
    localStorage.setItem("umbrage-access-time", "");
    navigate("../log-in");
  };
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="static">
        <Toolbar>
          <PersonIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Contacts Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogOut}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
