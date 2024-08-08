// import React from 'react';
// import { Box, Typography, Button } from "@mui/material";
// import CustomizedInput from '../components/shared/CustomizedInput';
// import { IoIosLogIn } from 'react-icons/io';
// import { toast } from "react-hot-toast";
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';



// /// handleSubmit is a function that we will use to get from data (email and password) 


// const Login = () => {

//   const auth = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();   /// this is very crucial as this prevents browser to refresh 
//     // Get the email and password values
//     const formData = new FormData(e.currentTarget);
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;
//
//     try {
//       toast.loading("Signing In", { id: "login" });
//       await auth?.login(email, password);
//       toast.success("Signed In Successfully", { id: "login" });
      
//     } catch (error) {
//       console.log(error);
//       toast.error("Signing In Failed", { id: "login" });
//     }
//   };






//   return (
//     <Box width={"100%"} height={"100%"} display="flex" flex={1}>
//       <Box
//         display={"flex"}
//         flex={{ xs: 1, md: 1 }}
//         justifyContent={"center"}
//         alignItems={"center"}
//         padding={2}
//         ml={"auto"}
//         mt={16}
//       >
//         <form
//           onSubmit={handleSubmit}
//           style={{
//             margin: "auto",
//             padding: "30px",
//             boxShadow: "10px 10px 20px #000",
//             borderRadius: "10px",
//             border: "none",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//             }}
//           >
//             <Typography
//               variant="h4"
//               textAlign="center"
//               padding={2}
//               fontWeight={600}
//             >
//               Login
//             </Typography>
//             <CustomizedInput type="email" name="email" label="Email" />
//             <CustomizedInput type="password" name="password" label="Password" />
//             <Button
//               type="submit"
//               sx={{
//                 px: 2,
//                 py: 1,
//                 mt: 2,
//                 width: "400px",
//                 borderRadius: 2,
//                 bgcolor: "#00fffc",
//                 ":hover": {
//                   bgcolor: "white",
//                   color: "black",
//                 },
//               }}
//               endIcon={<IoIosLogIn />}
//             >
//               Login
//             </Button>
//           </Box>
//         </form>
//       </Box>

//     </Box>
//   )
// }

// export default Login




import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from '../components/shared/CustomizedInput';
import { IoIosLogIn } from 'react-icons/io';
import { toast } from "react-hot-toast";
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
      
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };

  // Redirect based on user role
  useEffect(() => {
    if (auth?.isLoggedIn && auth?.user) {
      switch (auth.user.role) {
        case 'admin':
          navigate('/admindashboard');
          break;
        case 'poweruser':
          navigate('/puserdashboard');
          break;
        case 'normaluser':
          navigate('/nuserdashboard');
          break;
        default:
          // Optionally handle unknown role or when there's no role
          navigate('/');
          break;
      }
    }
  }, [auth?.isLoggedIn, auth?.user]); // Depend on auth state and user object

  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 1 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              endIcon={<IoIosLogIn />}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
