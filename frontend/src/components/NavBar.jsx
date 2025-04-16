import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Button, Typography } from "@mui/material";
import RoundedBtn from "./RoundedBtn";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const buttons = ["Home", "Chefs", "Recipes", "Login"];
  const navigate = useNavigate();

  const handleClick = (btn) => {
    console.log(btn);
    if (btn === "Home") {
      navigate("/");
    } else if (btn === "Chefs") {
      navigate("/ourchefs");
    } else if (btn === "Recipes") {
      navigate("/ExploreRecipes");
    } else if (btn === "Login") {
      navigate("/login");
    }
  };

  const handleRoundBtnClick = () => {
    navigate("/Signup");
  };
  return (
    // <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar
        sx={{ backgroundColor: "#FBFBFB", justifyContent: "space-between" }}
      >
        {/* Left Button */}
        <img
          src="https://m.media-amazon.com/images/I/51hNRqIg+eL.png"
          alt="logo"
          style={{
            width: "40px",
            // height: '40px',
            borderRadius: "50%",
            objectFit: "cover",
            paddingRight: "10px",
          }}
        />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "sans-serif",
            fontWeight: 700,
            //    letterSpacing: '.3rem',
            color: "#030303",
            textDecoration: "none",
          }}
        >
          Recipe Nest
        </Typography>

        {/* Center Buttons */}
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
              onClick={() => {
                handleClick(btn);
              }}
            >
              {btn}
            </Button>
          ))}
          {/* <Button sx={{color: '#88304E'}}></Button> */}
        </Box>

        {/* Right Button */}
        <RoundedBtn
          text="Join as a Chef"
          onClick={handleRoundBtnClick}
        ></RoundedBtn>
      </Toolbar>
    </AppBar>
  );
}
