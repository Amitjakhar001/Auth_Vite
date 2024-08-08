import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";


const Logo = () => {
    return (
      <div
        style={{
          display: "flex",
          marginRight: "auto",
        //   color:"white",
        //   alignItems: "center",
          gap: "15px",
        }}
      >
        <Link to={"/"}>
          <img
            src="bsp.png"
            alt="bspimage"
            width={"30px"}
            height={"30px"}
            // className="image-inverted"
          />
        </Link>{" "}
        <Typography
          sx={{
            display: { md: "block", sm: "none", xs: "none" },
            mr: "auto",
            fontWeight: "800",
            textShadow: "2px 2px 20px #000",
          }}
        >
          <span style={{ fontSize: "20px" }}>Fault</span>-Detection
        </Typography>
      </div>
    );
  };
  
  export default Logo;