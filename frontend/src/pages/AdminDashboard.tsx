// import React from 'react'

// const AdminDashboard = () => {
//   return (
//     <div>AdminDashboard</div>
//   )
// }

// export default AdminDashboard


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleUserManagementClick = () => {
    navigate("/admindashboard/usermanagement");
  };

  return (
    <div>
        {/* <h1>Admin Dashboard here</h1> */}
    </div>
  );
}

export default AdminDashboard;