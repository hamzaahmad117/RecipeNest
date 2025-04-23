import {
  Box,
  Grid,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Link,
  Divider,
} from "@mui/material";

import { useEffect, useState } from "react";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if user is already logged in (e.g., check local storage or cookies)
    const loggedInUser = localStorage.getItem("chef");
    if (loggedInUser) {
      // Redirect to dashboard or home page
      window.location.href = "/Profile"; // Change this to your desired route
    }
  }, []);

  const loginHandler = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/chefs/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const data = await res.json();
  
      if (data.success) {
        // Store user info in localStorage
        localStorage.setItem("chef", JSON.stringify(data.chef));
  
        // Redirect to dashboard
        window.location.href = "/Profile";
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login error. Try again.");
    }
  };
  



  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item xs={12} md={6} sx={{ position: "relative" }}>
        <img
          src="https://i.pinimg.com/736x/54/6f/31/546f31429740caf875caf584cbcc4a93.jpg"
          alt="Chef preparing food"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#fff",
        }}
      >
        <Box sx={{ width: "80%", maxWidth: 400 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#333" }}
          >
            Login to your Account
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ color: "#666", mb: 3 }}
          >
            Manage your chef dashboard
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
            <Divider sx={{ flexGrow: 1 }} />
            <Typography sx={{ mx: 2, color: "#888", fontSize: "0.875rem" }}>
              Sign in with Email
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>

          <Typography sx={{ mb: 1, fontWeight: 500 }}>Email</Typography>
          <TextField
            fullWidth
            placeholder="Enter your email"
            variant="outlined"
            size="small"
            sx={{ mb: 2.5 }}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Typography sx={{ mb: 1, fontWeight: 500 }}>Password</Typography>
          <TextField
            fullWidth
            placeholder="Enter your Password"
            type="password"
            variant="outlined"
            size="small"
            sx={{ mb: 1 }}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  defaultUnChecked
                  size="small"
                  sx={{
                    color: "#541212",
                    "&.Mui-checked": {
                      color: "#541212",
                    },
                  }}
                />
              }
              label="Remember Me"
            />
            <Link
              href="#"
              underline="none"
              sx={{ color: "#7A1E1E", fontSize: "0.875rem" }}
            >
              Forgot Password?
            </Link>
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              backgroundColor: "#541212",
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "#3e0e0e",
              },
            }}

            onClick={loginHandler}
          >
            Login
          </Button>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography sx={{ fontSize: "0.875rem", display: "inline" }}>
              Not Registered Yet?
            </Typography>
            <Link
              href="/Signup"
              underline="none"
              sx={{ color: "#7A1E1E", fontWeight: 500, fontSize: "0.875rem" }}
            >
              Create an account
            </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
