import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField } from "@mui/material";
import { toast } from "react-hot-toast";
import { useAuth } from '../context/AuthContext'; // Ensure correct path

const DeleteUser = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { deleteUser } = useAuth();

  const handleDelete = async () => {
    try {
      await deleteUser(email);
      toast.success('User deleted successfully');
      navigate('/admindashboard/usermanagement'); // Redirect after successful deletion
    } catch (error) {
      console.error('Failed to delete user:', error);
      toast.error('Failed to delete user');
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
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission
            handleDelete();
          }}
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
              Delete User
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              InputProps={{
                style: { color: 'white' } // Set the color of input text to white
              }}
              InputLabelProps={{
                style: { color: 'white' } // Optionally set the label text color to white
              }}
            />
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
              Delete
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default DeleteUser;
