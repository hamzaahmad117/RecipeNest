import { useEffect, useState } from "react";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import Bio from "./Bio";
import ChefCard from "./ChefCard";
import PopupRecipe from "./PopupRecipe";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const [jsonData, setJsonData] = useState({ cookingInstructions: [] });
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [chef, setChef] = useState(null); // 👈 null = not checked yet
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    const localChef = localStorage.getItem("chef");

    if (!localChef) {
      // window.location.href = "/login";
      navigate("/login"); // Redirect to login page if not logged in
      return;
    }

    const chefData = JSON.parse(localChef);
    setChef(chefData);

    const fetchRecipes = async () => {
      try {
        console.log(chefData.email);
        const response = await fetch(`http://localhost:5000/api/chefs/${chefData.email}/recipes`);
        if (!response.ok) throw new Error("Failed to fetch recipes");
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [navigate]);

  const clickHandler = (data) => {
    setOpen(true);
    setJsonData(data);
  };

  // 🧠 Graceful handling during initial auth check
  if (!chef) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <>
      <PopupRecipe open={open} onClose={() => setOpen(false)} data={jsonData} edit={false}/>
      <Bio
        name={chef.firstName + " " + chef.lastName}
        description={chef.description}
        avatar={chef.avatar === '' ? "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" : chef.avatar}
        twitter={chef.twitter}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <hr style={{ width: "50%", height: "0.12px", backgroundColor: "black", borderWidth: "0" }} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: "black" }}>
          Featured Recipes
        </Typography>
      </Box>
      <Box sx={{ px: 4, py: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <Box
                sx={{
                  border: '6px solid #eee',
                  borderTop: '6px solid #541212',
                  borderRadius: '50%',
                  width: 50,
                  height: 50,
                  animation: 'spin 1s linear infinite',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
              />
            </Box>
          ) : recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ChefCard
                  name={recipe.name}
                  description={recipe.description}
                  avatar={recipe.avatar}
                  btnText={"View Recipe"}
                  onClick={() =>
                    clickHandler({
                      name: recipe.name,
                      description: recipe.description,
                      time: recipe.time,
                      cuisine: recipe.cuisine,
                      cookingInstructions: recipe.cookingInstructions,
                      avatar: recipe.avatar,
                    })
                  }
                />
              </Grid>
            ))
          ) : (
            <Typography variant="h6">No recipes found</Typography>
          )}
        </Grid>
      </Box>
    </>
  );
}
