import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChefCard from "./ChefCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MeetOurChefs() {
  const navigate = useNavigate();
  const [chefs, setChefs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const chefsPerPage = 4; // number of chefs per page

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/chefs");
        setChefs(response.data);
      } catch (error) {
        console.error("Error fetching chefs:", error);
      }
    };

    fetchChefs();
  }, []);

  const handleChefClick = (chef) => {
    navigate("/chef-profile", { state: { chef } });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // reset page on search
  };

  const filteredChefs = chefs.filter((chef) =>
    `${chef.firstName} ${chef.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const indexOfLastChef = currentPage * chefsPerPage;
  const indexOfFirstChef = indexOfLastChef - chefsPerPage;
  const currentChefs = filteredChefs.slice(indexOfFirstChef, indexOfLastChef);

  const totalPages = Math.ceil(filteredChefs.length / chefsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

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
          value={searchQuery}
          onChange={handleSearchChange}
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

      {/* chefs grid */}
      <Box sx={{ px: 4, py: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          {currentChefs.map((chef, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ChefCard
                name={`${chef.firstName} ${chef.lastName}`}
                description={chef.description}
                avatar={chef.avatar}
                btnText="View Profile"
                onClick={() => handleChefClick(chef)}
              />
            </Grid>
          ))}
        </Grid>

        {/* pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}
      </Box>
    </>
  );
}
