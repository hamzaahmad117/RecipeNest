import { Box, Typography } from "@mui/material";
import RoundedBtn from "./RoundedBtn"; // Assuming it's a custom button component
import MeetOurChefs from "./MeetOurChefs";

export default function LandingPage() {
  return (
    <>
      <Box
        sx={{
          height: " 100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: 2,
          color: "#fff",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1504674900247-0877df9cc836)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          fontFamily: `'Poppins', sans-serif`,
          px: 2,
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            fontFamily: `'Playfair Display', serif`,
            maxWidth: "730px",
            letterSpacing: "0.2rem",
            mx: "auto",
            px: 2,
          }}
        >
          Discover and Share Amazing Recipes with RecipeNest
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: `'Playfair Display', serif`,
            maxWidth: "600px",
            letterSpacing: "0.1rem",
            mx: "auto",
            px: 2,
          }}
        >
          A community for chefs and food lovers.
        </Typography>

        <RoundedBtn text="Explore Recipes" />
      </Box>
      <MeetOurChefs />
    </>
  );
}
