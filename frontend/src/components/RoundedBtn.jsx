import { Button } from "@mui/material";

export default function RoundedBtn(props) {
  const btnText = props.text;

  return (
    <Button onClick={props.onClick}
      variant="contained"
      sx={{
        backgroundColor: "#88304E",
        borderRadius: "60px",
        textTransform: "none",
      }}
    >
      {btnText}
    </Button>
  );
}
