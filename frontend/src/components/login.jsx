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

export default function Login() {
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
          />

          <Typography sx={{ mb: 1, fontWeight: 500 }}>Password</Typography>
          <TextField
            fullWidth
            placeholder="Enter your Password"
            type="password"
            variant="outlined"
            size="small"
            sx={{ mb: 1 }}
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
          >
            Login
          </Button>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography sx={{ fontSize: "0.875rem", display: "inline" }}>
              Not Registered Yet?
            </Typography>
            <Link
              href="#"
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
