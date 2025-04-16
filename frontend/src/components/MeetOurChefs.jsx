import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChefCard from "./ChefCard";
import { useNavigate } from "react-router-dom";
export default function MeetOurChefs() {

    const navigate = useNavigate();
    const handleClick = (chef) => {

    console.log(chef)
    navigate('/Profile')

  }

  const chefs = [
    {
      name: "Daniel Fernandez",
      description:
        "A passionate baker specializing in artisan bread and French pastries.",
      avatar:
        "https://media.istockphoto.com/id/1388253782/photo/positive-successful-millennial-business-professional-man-head-shot-portrait.jpg?s=612x612&w=0&k=20&c=uS4knmZ88zNA_OjNaE_JCRuq9qn3ycgtHKDKdJSnGdY=",
    },
    {
      name: "Emily Carter",
      description:
        "Master of fusion cuisine, blending Latin flavors with modern twists.",
      avatar:
        "https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg",
    },
    {
      name: "Aysha Williams",
      description:
        "Loves to bring South Asian spices to life with unique homemade recipes.",
      avatar:
        "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=",
    },
  ];
  return (
    <>
      {/* bg image */}
      <Box
        sx={{
          height: 300,
          backgroundImage:
            "url(https://static.independent.co.uk/2021/10/21/12/iStock-1081422898.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "150px",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ color: "white", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
        >
          Meet Our Chefs
        </Typography>
      </Box>
      {/* search bar */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: -3 }}>
        <TextField
          placeholder="Search for a chef..."
          variant="outlined"
          sx={{
            width: "60%",
            backgroundColor: "white",
            borderRadius: 5,
            boxShadow: 1,
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
          {chefs.map((chef, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ChefCard
                name={chef.name}
                description={chef.description}
                avatar={chef.avatar}
                btnText="View Profile"
                onClick = {() => handleClick(chef.name)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
