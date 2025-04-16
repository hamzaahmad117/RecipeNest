import ChefCard from "./ChefCard";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import PopupForm from "./PopupForm";
import { useState } from "react";
import PopupRecipe from "./PopupRecipe";

export default function ChefProfile({
  chefData = {
    name: "Emily Carter",
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg",
  },
}) {
  const [jsonData, setJsonData] = useState({
    cookingInstructions: [],
  });
  const [open1, setOpen1] = useState(false);
  const clickHandler1 = (data) => {
    setOpen1(true);
    setJsonData(data);
  };
  const [open2, setOpen2] = useState(false);
  const clickHandler2 = (data) => {
    setOpen2(true);
    setJsonData(data);
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };

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
      <PopupForm open={open1} onClose={() => setOpen1(false)} />
      <PopupRecipe
        open={open2}
        onClose={() => setOpen2(false)}
        data={jsonData}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginBottom: "30px",
          position: "relative",
          gap: "20px",
          maxWidth: "800px",
          mx: "auto",
          padding: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            width: "100%",
            mb: 1,
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              textAlign: { xs: "center", sm: "center" },
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                fontFamily: `'Playfair Display', serif`,
                letterSpacing: "0.2rem",
              }}
            >
              Welcome, {chefData.name}!
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: `'Playfair Display', serif`,
                letterSpacing: "0.1rem",
              }}
            >
              Manage your recipes, edit your profile, and track engagement.
            </Typography>
          </Box>

          <Avatar
            src={chefData.avatar}
            alt={chefData.name}
            sx={{
              width: 80,
              height: 80,
              border: "2px solid #f5f5f5",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "800px",
          mx: "auto",
          mb: 6,
          px: 2,
          gap: 3,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        {/* Add new recipe button */}
        <Button
          onClick={() => {
            setOpen1(true);
          }}
          variant="contained"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3,
            bgcolor: "#f8f8f8",
            color: "#333",
            borderRadius: 2,
            flex: 1,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "#e8e8e8",
              transform: "translateY(-3px)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            },
          }}
        >
          <AddIcon
            sx={{
              fontSize: 40,
              mb: 1,
              color: "#4CAF50",
            }}
          />
          <Typography fontWeight="medium">Add new Recipe</Typography>
        </Button>

        {/* <PopupForm></PopupForm> */}

        {/* Edit recipe button */}
        <Button
          variant="contained"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3,
            bgcolor: "#f8f8f8",
            color: "#333",
            borderRadius: 2,
            flex: 1,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "#e8e8e8",
              transform: "translateY(-3px)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            },
          }}
        >
          <RestaurantMenuIcon
            sx={{
              fontSize: 40,
              mb: 1,
              color: "#FFA000",
            }}
          />
          <Typography fontWeight="medium">Edit Recipe</Typography>
        </Button>

        {/* Edit profile button */}
        <Button
          variant="contained"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3,
            bgcolor: "#f8f8f8",
            color: "#333",
            borderRadius: 2,
            flex: 1,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "#e8e8e8",
              transform: "translateY(-3px)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            },
          }}
        >
          <EditIcon
            sx={{
              fontSize: 40,
              mb: 1,
              color: "#2196F3",
            }}
          />
          <Typography fontWeight="medium">Edit Profile</Typography>
        </Button>
      </Box>

      {/* Recipe portion */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: "black",
            fontFamily: `'Playfair Display', serif`,
          }}
        >
          My Recipes
        </Typography>
      </Box>

      <Box sx={{ px: 4, py: 2 }}>
        <Grid container spacing={4} justifyContent="center">
          {recipes.map((recipe, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ChefCard
                name={recipe.name}
                description={recipe.description}
                avatar={recipe.avatar}
                btnText={"View Recipe"}
                onClick={() => {
                  clickHandler2({
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
