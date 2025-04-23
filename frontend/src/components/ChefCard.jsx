import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Box } from "@mui/material";
import RoundedBtn from "./RoundedBtn";

export default function ChefCard({ name, description, avatar, btnText, onClick }) {
  return (
    <Card
      sx={{
        textAlign: "center",
        p: 2,
        borderRadius: "16px",
        boxShadow: 3,
        height: 350,
        width: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        mx: "auto",
      }}
    >
      <Avatar
        src={avatar}
        alt={name}
        sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
      />
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          mt={1}
          sx={{
            maxHeight: 60,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <Box sx={{ mt: 2 }}>
        <RoundedBtn text={btnText} onClick={onClick} />
      </Box>
    </Card>
  );
}
