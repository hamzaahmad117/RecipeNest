import { Box, Typography, Grid } from "@mui/material";
import Bio from "./Bio";
import ChefCard from "./ChefCard";
import PopupRecipe from "./PopupRecipe";
import { useState } from "react";
export default function Profile() {

  const [open, setOpen] = useState(false);
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
    <PopupRecipe open={open} onClose={() => setOpen(false)}/>
      <Bio
        name="Emily Carter"
        description="Master of fusion cuisine, blending Latin flavors with modern twists."
        avatar="https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg"
        twitter="https://x.com/?lang=en"
      />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <hr
          style={{
            width: "50%",
            color: "black",
            height: "0.12px",
            backgroundColor: "black",
            borderWidth: "0 ",
          }}
        ></hr>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ color: "black" }}>
          Featured Recipes
        </Typography>
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
                onClick={() => setOpen(true)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
