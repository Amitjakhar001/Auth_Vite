import React, { useState } from 'react';
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from '../components/shared/CustomizedInput';
import { toast } from "react-hot-toast";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; 

const EditUser = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    role: ''
  });

  if (!auth) {
    console.error("Auth context is not available");
    return <div>Loading...</div>;
  }

  const { editUser } = auth;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, role } = formData;

    try {
      toast.loading("Editing User", { id: "edit-user" });
      await editUser(email, role);
      toast.dismiss("edit-user");
      toast.success("User Edited Successfully");
      navigate('/admindashboard/usermanagement'); // Redirect on success
    } catch (error) {
      console.error(error);
      toast.error("Failed to Edit User", { id: "edit-user" });
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
              Edit User
            </Typography>
            <CustomizedInput type="email" name="email" label="Email" onChange={handleChange} />
            <CustomizedInput type="text" name="role" label="To which Role you want to change" onChange={handleChange} />
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
              Edit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default EditUser;
