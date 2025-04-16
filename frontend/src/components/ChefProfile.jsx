import ChefCard from "./ChefCard";
import { Box, Typography, Grid, Avatar, Button, Modal, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import PopupForm from "./PopupForm";
import { useState } from "react";


export default function ChefProfile({
  chefData = {
    name: "Emily Carter",
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg",
  },
}) {
  //   const firstName = chefData.name;

  const [open, setOpen] = useState(false);
  const handleClose = () => { setOpen(false) }


  const recipes = [
    {
      name: "Sour Dough",
      description:
        "A rustic, tangy sourdough loaf with a crispy crust and soft interior",
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
      {/* Header section */}
      {/* <Modal open={open} onClose={handleClose}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 350,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h6" mb={2}>Fill the form</Typography>
          <form >
            <TextField
              fullWidth
              label="Name"
              name="name"
              // value={formData.name}
              // onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              // value={formData.email}
              // onChange={handleChange}
              margin="normal"
            />
            <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>Submit</Button>
          </form>
        </Box>
      </Modal> */}
      <PopupForm open={open} onClose={() => setOpen(false)}/>

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
        <Button onClick={() => { setOpen(true) }}
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
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
