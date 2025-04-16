import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChefCard from "./ChefCard";
export default function RecipePortfolio() {
  const recipes = [
    {
      name: "Sour Dough",
      description:
        "A rustic , tangy,sourdough loaf with a crispy crust and soft interior",
      avatar:
        "https://amybakesbread.com/wp-content/uploads/2020/04/cropped-img_0491-scaled.jpeg",
    },
    {
      name: "Classic Victoria Sponge Cake",
      description:
        "A light and fluffy sponge cake filled with strawberry jam and cream",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_xG_eQJCxY9Z0Lw23Sfgp8mYvZbyI15Pr_w&s",
    },
    {
      name: "Traditional Steak and Ale Pie",
      description:
        "A hearty British pie with tender steak rich ale gravy and a flaky pastry crust",
      avatar:
        "https://www.krumpli.co.uk/wp-content/uploads/2022/05/Steak-and-Ale-Pie-02-720x720.jpg",
    },
  ];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            fontFamily: `'Playfair Display', serif`,
            maxWidth: "730px",
            letterSpacing: "0.2rem",
            mx: "auto",
            px: 2,
          }}
        >
          Recipe Portfolio
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
          Emily Carter
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: -3,
          borderWidth: "0",
        }}
      >
        <TextField
          placeholder="Search for a chef..."
          variant="outlined"
          sx={{
            width: "60%",
            // backgroundColor: "white",
            borderRadius: 5,
            boxShadow: 1,
            backgroundColor: "grey",
            borderWidth: "0",
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <Box sx={{ px: 4, py: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          {recipes.map((recipe, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ChefCard
                name={recipe.name}
                description={recipe.description}
                avatar={recipe.avatar}
                btnText={"View Recipe"}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
