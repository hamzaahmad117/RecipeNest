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

export default function Signup() {
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
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#333" }}
          >
            Create an Account
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ color: "#666", mb: 3 }}
          >
            Join our chef community
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
            <Divider sx={{ flexGrow: 1 }} />
            <Typography sx={{ mx: 2, color: "#888", fontSize: "0.875rem" }}>
              Sign up with Email
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>

          <Typography sx={{ mb: 1, fontWeight: 500 }}>Full Name</Typography>
          <TextField
            fullWidth
            placeholder="Enter your Full Name"
            variant="outlined"
            size="small"
            sx={{ mb: 2.5 }}
          />

          <Typography sx={{ mb: 1, fontWeight: 500 }}>Email</Typography>
          <TextField
            fullWidth
            placeholder="Enter your mail"
            variant="outlined"
            size="small"
            sx={{ mb: 2.5 }}
          />

          <Typography sx={{ mb: 1, fontWeight: 500 }}>Phone Number</Typography>
          <TextField
            fullWidth
            placeholder="Enter your Phone number"
            variant="outlined"
            size="small"
            sx={{ mb: 2.5 }}
          />

          <Typography sx={{ mb: 1, fontWeight: 500 }}>Password</Typography>
          <TextField
            fullWidth
            placeholder="Enter password"
            type="password"
            variant="outlined"
            size="small"
            sx={{ mb: 2.5 }}
          />

          <Typography sx={{ mb: 1, fontWeight: 500 }}>
            Confirm Password
          </Typography>
          <TextField
            fullWidth
            placeholder="Confirm Password"
            type="password"
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
          />

          <FormControlLabel
            control={
              <Checkbox
                size="small"
                sx={{
                  color: "#541212",
                  "&.Mui-checked": {
                    color: "#541212",
                  },
                }}
              />
            }
            label={
              <Box sx={{ fontSize: "0.875rem" }}>
                I agree to the Terms & Conditions
              </Box>
            }
            sx={{ mb: 2 }}
          />

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
          >
            Create Account
          </Button>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography sx={{ fontSize: "0.875rem", display: "inline" }}>
              Already have an account?{" "}
            </Typography>
            <Link
              href="#"
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
