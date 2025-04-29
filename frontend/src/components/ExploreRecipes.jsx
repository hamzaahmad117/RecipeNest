import ChefCard from "./ChefCard";
import {
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import PopupRecipe from "./PopupRecipe";
import axios from "axios"; // <-- Make sure axios is installed

import { Pagination } from "@mui/material"; // Add this import

export default function ExploreRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // <-- Add this
  const recipesPerPage = 4; // how many recipes per page

  const [jsonData, setJsonData] = useState({
    cookingInstructions: [],
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/recipes");
        setRecipes(response.data);
        setFilteredRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRecipes(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchQuery, recipes]);

  const clickHandler = (data) => {
    setOpen(true);
    setJsonData(data);
  };

  // Pagination logic
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <PopupRecipe open={open} onClose={() => setOpen(false)} data={jsonData} />

      {/* Title and Search */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "30px" }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ fontFamily: `'Playfair Display', serif`, maxWidth: "730px", letterSpacing: "0.2rem", mx: "auto", px: 2, marginTop: "30px" }}
        >
          All Recipes
        </Typography>

        <TextField
          placeholder="Search for a recipe..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: "60%",
            borderRadius: 5,
            boxShadow: 1,
            backgroundColor: "white",
            mt: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 5,
              "& fieldset": {
                border: "none", // removes the weird default outline
              },
              "&:hover fieldset": {
                border: "none", // no border on hover
              },
              "&.Mui-focused fieldset": {
                border: "none", // no border on focus
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

      </Box>

      {/* Recipe Cards */}
      <Box sx={{ px: 4, py: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          {currentRecipes.map((recipe, index) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id || index}>
              <ChefCard
                name={recipe.name}
                description={recipe.description}
                avatar={recipe.avatar}
                btnText={"View Recipe"}
                onClick={() => clickHandler({
                  name: recipe.name,
                  description: recipe.description,
                  time: recipe.time,
                  cuisine: recipe.cuisine,
                  cookingInstructions: recipe.cookingInstructions,
                  avatar: recipe.avatar,
                })}
              />
            </Grid>
          ))}
        </Grid>

        {/* Pagination component */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </>
  );
}
