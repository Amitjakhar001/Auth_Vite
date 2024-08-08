import React from 'react';
// import { useNavigate } from 'react-router-dom';
import NavigationLink from '../components/shared/NavigationLink';

const UserManagement = () => {
//   const navigate = useNavigate();

 
  return (
    <div>
      {/* <h1>User Management</h1> */}
      <NavigationLink 
        to="/admindashboard/usermanagement/createuser" 
        text="Create User" 
        bg="#4CAF50" 
        textColor="white"
      />
      <NavigationLink 
        to="/admindashboard/usermanagement/edituser" 
        text="Edit User" 
        bg="#FFC107" 
        textColor="black"
      />
      <NavigationLink 
        to="/admindashboard/usermanagement/deleteuser" 
        text="Delete User" 
        bg="#F44336" 
        textColor="white"
      />
    </div>
  );
}

export default UserManagement;
