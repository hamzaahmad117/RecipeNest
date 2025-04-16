import { Box, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import MessageIcon from "@mui/icons-material/Message";
export default function Bio({ name, description, avatar, twitter }) {
  return (
    <Box sx={{ marginTop: "50px", marginBottom: "40px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          overflowX: "hidden",
        }}
      >
        {/* Profile Image */}
        <img
          src={avatar}
          alt="Profile pic"
          style={{
            width: "120px",
            height: "100px",
            borderRadius: "20%",
            objectFit: "cover",
          }}
        />

        {/* Text Section */}
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ color: "black" }}>
            {name}
          </Typography>
          <Typography sx={{ marginBottom: 1 }}>{description}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TwitterIcon />
            <a
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#1DA1F2" }}
            >
              Twitter
            </a>
            <MessageIcon />
            <Typography style={{ textDecoration: "none", color: "#1DA1F2" }}>
              Message here!
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
