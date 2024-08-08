// import React from 'react';
// import { Box, Typography, Button } from "@mui/material";
// import CustomizedInput from '../components/shared/CustomizedInput';
// import { toast } from "react-hot-toast";
// import { useAuth } from '../context/AuthContext';

// const CreateUser = () => {

//     const auth = useAuth();
  
//     if (!auth) {
//       // Handle the error state, possibly showing a loading spinner or an error message
//       console.error("Auth context is not available");
//       return <div>Loading...</div>;
//     }
  


//   const { createuser } = auth;

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const name = formData.get("name") as string;
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;
//     const role = formData.get("role") as string;

//     try {
//       toast.loading("Creating User", { id: "create-user" });
//       await createuser(name, email, password, role);
//       toast.success("User Created Successfully", { id: "create-user" });
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to Create User", { id: "create-user" });
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
//               Create User
//             </Typography>
//             <CustomizedInput type="text" name="name" label="Name" />
//             <CustomizedInput type="email" name="email" label="Email" />
//             <CustomizedInput type="password" name="password" label="Password" />
//             <CustomizedInput type="text" name="role" label="Role" />
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
//             >
//               Create
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Box>
//   );
// }

// export default CreateUser;














import React from 'react';
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from '../components/shared/CustomizedInput';
import { toast } from "react-hot-toast";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; 

const CreateUser = () => {
  const auth = useAuth();
  const navigate = useNavigate(); 

  if (!auth) {
    console.error("Auth context is not available");
    return <div>Loading...</div>;
  }

  const { createuser } = auth;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    try {
      toast.loading("Creating User", { id: "create-user" });
      await createuser(name, email, password, role);
      toast.dismiss("create-user");
      toast.success("User Created Successfully");
      navigate('/admindashboard/usermanagement'); // Redirect on success
    } catch (error) {
      console.error(error);
      toast.error("Failed to Create User", { id: "create-user" });
    }
  };

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
              Create User
            </Typography>
            <CustomizedInput type="text" name="name" label="Name" />
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <CustomizedInput type="text" name="role" label="Role" />
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
            >
              Create
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default CreateUser;
