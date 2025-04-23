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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agree: false,
  });

  const [error, setError] = useState("");

  const handleChange = (field) => (e) => {
    const value = field === "agree" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleSignup = async () => {
    setError("");

    if (!formData.agree) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }
    const { firstName, lastName, email, password} = formData;
    if (!firstName || !lastName || !email || !password) {
      setError("Please fill all required fields and agree to terms.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/chefs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
          avatar: "", // Optional
          description: "", // Optional
          twitter: "", // Optional
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      localStorage.setItem("chef", JSON.stringify(data.chef));
      navigate("/"); // Redirect anywhere after signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          bgcolor: "#fff",
          pr: 6,
        }}
      >
        <Box sx={{ width: "80%", maxWidth: 400 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "#333" }}>
            Create an Account
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ color: "#666", mb: 3 }}>
            Join our chef community
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
            <Divider sx={{ flexGrow: 1 }} />
            <Typography sx={{ mx: 2, color: "#888", fontSize: "0.875rem" }}>
              Sign up with Email
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>

          {["firstName", "lastName", "email", "password"].map((field) => (
            <Box key={field} sx={{ mb: 2.5 }}>
              <Typography sx={{ mb: 1, fontWeight: 500 }}>
                {field === "firstName"
                  ? "First Name"
                  : field === "lastName"
                  ? "Last Name"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </Typography>
              <TextField
                fullWidth
                placeholder={`Enter your ${field === "firstName" ? "first name" : field === "lastName" ? "last name" : field}`}
                variant="outlined"
                type={field === "password" ? "password" : "text"}
                size="small"
                value={formData[field]}
                onChange={handleChange(field)}
              />
            </Box>
          ))}

          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={formData.agree}
                onChange={handleChange("agree")}
                sx={{
                  color: "#541212",
                  "&.Mui-checked": {
                    color: "#541212",
                  },
                }}
              />
            }
            label={<Box sx={{ fontSize: "0.875rem" }}>I agree to the Terms & Conditions</Box>}
            sx={{ mb: 2 }}
          />

          {error && (
            <Typography sx={{ color: "red", fontSize: "0.875rem", mb: 2 }}>
              {error}
            </Typography>
          )}

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
            onClick={handleSignup}
          >
            Create Account
          </Button>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography sx={{ fontSize: "0.875rem", display: "inline" }}>
              Already have an account?{" "}
            </Typography>
            <Link
              href="/login"
              underline="none"
              sx={{ color: "#7A1E1E", fontWeight: 500, fontSize: "0.875rem" }}
            >
              Login
            </Link>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} md={8} sx={{ position: "relative" }}>
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
    </Grid>
  );
}
