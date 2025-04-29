import ChefCard from "./ChefCard";
import EditProfileModal from "./EditProfileModal";
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
import { useEffect } from "react";

export default function ChefProfile() {
  
    const [chefData, setChefData] = useState({ name: "", avatar: "", email: "" });
    const [recipes, setRecipes] = useState([]);
    const [jsonData, setJsonData] = useState({ cookingInstructions: [] });
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
const [profile, setProfile] = useState(null);

useEffect(() => {
  const stored = localStorage.getItem("chef");
  if (stored) {
    setProfile(JSON.parse(stored));
  }
}, []);
  
const handleProfileUpdate = (newData) => {
  setProfile(newData);
  localStorage.setItem("chef", JSON.stringify(newData));
};

    const clickHandler1 = (data) => {
      setOpen1(true);
      setJsonData(data);
    };
  
    const clickHandler2 = (data) => {
      setOpen2(true);
      setJsonData(data);
    };
  
    useEffect(() => {
      const storedChef = localStorage.getItem("chef");
      if (storedChef) {
        try {
          const parsedChef = JSON.parse(storedChef);
          const fullName = `${parsedChef.firstName} ${parsedChef.lastName}`;
          const avatar = parsedChef.avatar || "";
          const email = parsedChef.email;
  
          setChefData({ name: fullName, avatar, email });
  
          fetch(`http://localhost:5000/api/chefs/${email}/recipes`)
            .then((res) => {
              if (!res.ok) {
                throw new Error("Network response was not ok");
              }
              return res.json();
            })
            .then((data) => {
              setRecipes(data);
            })
            .catch((error) => {
              console.error("Error fetching recipes:", error);
            });
        } catch (err) {
          console.error("Error parsing chef from localStorage:", err);
        }
      }
    }, []);
  // const handleClose = () => {
  //   setOpen(false);
  // };

  //const recipes =[];
  return (
    <>
      <PopupForm open={open1} onClose={() => setOpen1(false)} chefEmail={chefData.email}/>
      <PopupRecipe
        open={open2}
        onClose={() => setOpen2(false)}
        data={jsonData}
        chefEmail={chefData.email}
        edit={true}
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
        {/* <Button 
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
        </Button> */}
        



        {/* Edit profile button */}
        <Button
        onClick={() => setModalOpen(true)}
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
        {profile && (
  <EditProfileModal
    open={modalOpen}
    onClose={() => setModalOpen(false)}
    profileData={profile}
    onUpdated={handleProfileUpdate}
  />
)}
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
      <Grid
        item
        xs={12}     // Full width on mobile
        sm={6}      // 2 per row on small screens
        md={6}      // 2 per row on medium screens
        key={index}
        display="flex"
        justifyContent="center"
      >
        <ChefCard
        id={recipe.id}
          name={recipe.name}
          description={recipe.description}
          avatar={recipe.avatar}
          btnText={"View Recipe"}
          onClick={() => {
            clickHandler2({
              id: recipe.id,
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
