import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Button, Typography } from "@mui/material";
import RoundedBtn from "./RoundedBtn";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const chef = localStorage.getItem("chef");

  // Set buttons based on login state
  const buttons = chef
    ? ["Home", "Profile", "Edit Profile", "Chefs", "Recipes", "Logout"]
    : ["Home", "Chefs", "Recipes", "Login"];

  const handleClick = (btn) => {
    switch (btn) {
      case "Home":
        navigate("/");
        break;
      case "Profile":
        navigate("/profile");
        break;
      case "Edit Profile":
        navigate("/MyProfile");
        break;
      case "Chefs":
        navigate("/ourchefs");
        break;
      case "Recipes":
        navigate("/ExploreRecipes");
        break;
      case "Login":
        navigate("/login");
        break;
      case "Logout":
        localStorage.removeItem("chef");
        navigate("/login");
        break;
      default:
        break;
    }
  };

  const handleRoundBtnClick = () => {
    navigate("/Signup");
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{ backgroundColor: "#FBFBFB", justifyContent: "space-between" }}
      >
        {/* Logo & Title */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://m.media-amazon.com/images/I/51hNRqIg+eL.png"
            alt="logo"
            style={{
              width: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              paddingRight: "10px",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              fontWeight: 700,
              color: "#030303",
              textDecoration: "none",
            }}
          >
            Recipe Nest
          </Typography>
        </Box>

        {/* Nav Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          {buttons.map((btn) => (
            <Button
              key={btn}
              sx={{ color: "#88304E", textTransform: "none" }}
              onClick={() => handleClick(btn)}
            >
              {btn}
            </Button>
          ))}
        </Box>

        {/* Join as a Chef Button (only if not logged in) */}
        {!chef && (
          <RoundedBtn text="Join as a Chef" onClick={handleRoundBtnClick} />
        )}
      </Toolbar>
    </AppBar>
  );
}
