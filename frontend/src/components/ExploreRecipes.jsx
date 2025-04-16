import ChefCard from "./ChefCard";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Button,
  Modal,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import PopupRecipe from "./PopupRecipe";

export default function ExploreRecipes() {
  const [jsonData, setJsonData] = useState({
    cookingInstructions: [],
  });
  const [open, setOpen] = useState(false);
  const clickHandler = (data) => {
    setOpen(true);
    setJsonData(data);
  };
  const recipes = [
    {
      name: "Sour Dough",
      description:
        "A classic sourdough bread made with a tangy starter and a slow fermentation process, perfect for bread lovers.",
      avatar:
        "https://amybakesbread.com/wp-content/uploads/2020/04/cropped-img_0491-scaled.jpeg",
      time: "24 hours (including fermentation)",
      cuisine: "Western",
      cookingInstructions: [
        "Mix flour, water, salt, and sourdough starter.",
        "Knead the dough and let it rest.",
        "Allow the dough to ferment for 18-24 hours.",
        "Shape the dough and let it rise for another 2 hours.",
        "Preheat the oven to 475°F (245°C).",
        "Bake for 30-40 minutes until the crust is golden.",
        "Let it cool before slicing.",
      ],
    },
    {
      name: "Classic Victoria Sponge Cake",
      description:
        "A light and fluffy sponge cake filled with strawberry jam and cream",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_xG_eQJCxY9Z0Lw23Sfgp8mYvZbyI15Pr_w&s",
      time: "1 hour",
      cuisine: "Western",
      cookingInstructions: [
        "Preheat the oven to 350°F (175°C).",
        "Grease and line two 8-inch round cake pans.",
        "Cream together butter and sugar until light and fluffy.",
        "Beat in eggs one at a time, then fold in flour and baking powder.",
        "Divide the batter evenly between the prepared pans.",
        "Bake for 20-25 minutes or until a toothpick comes out clean.",
        "Cool the cakes on a wire rack before filling with jam and cream.",
      ],
    },
    {
      name: "Traditional Steak and Ale Pie",
      description:
        "A hearty British pie with tender steak rich ale gravy and a flaky pastry crust",
      avatar:
        "https://www.krumpli.co.uk/wp-content/uploads/2022/05/Steak-and-Ale-Pie-02-720x720.jpg",
      time: "3 hours",
      cuisine: "British",
      cookingInstructions: [
        "Season and brown the steak in a hot pan.",
        "Add onions, carrots, and ale, then simmer until the meat is tender.",
        "Thicken the gravy with flour or cornstarch.",
        "Transfer the filling to a pie dish and cover with pastry.",
        "Brush the pastry with egg wash.",
        "Bake in a preheated oven at 375°F (190°C) for 30-40 minutes.",
        "Serve hot with mashed potatoes or vegetables.",
      ],
    },
  ];

  return (
    <>
      <PopupRecipe open={open} onClose={() => setOpen(false)} data={jsonData} />
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
          All Recipes
        </Typography>
        <TextField
          placeholder="Search for a recipe..."
          variant="outlined"
          sx={{
            width: "60%",

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
                onClick={() => {
                  clickHandler({
                    name: recipe.name,
                    description: recipe.description,
                    time: recipe.time,
                    cuisine: recipe.cuisine,
                    cookingInstructions: recipe.cookingInstructions,
                    avatar: recipe.avatar,
                  });
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
