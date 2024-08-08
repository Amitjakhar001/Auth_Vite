import axios from "axios";

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/user/login", { email, password });
    if (res.status !== 200) {
      throw new Error("Unable to login");
    }
    const data = await res.data;
    console.log(data);
    return data;
  };

  
  export const checkAuthStatus = async () => {
    const res = await axios.get("/user/auth-status");
    if (res.status !== 200) {
      throw new Error("Unable to authenticate");
    }
    const data = await res.data;
    return data;
  };
  

  export const logoutUser = async () => {
    const res = await axios.get("/user/logout");
    if (res.status !== 200) {
      throw new Error("Logout failed");
    }
    const data = await res.data;
    return data;
  };
  


  // Add the function to post data to create a user
export const createUser = async (name: string, email: string, password: string, role: string) => {
  try {
    const response = await axios.post("/user/admindashboard/usermanagement/createuser", { name, email, password, role });
    if (response.status === 201) {
      console.log("User created successfully");
      return response.data;
    } else {
      throw new Error('Failed to create user');
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};



export const deleteUser = async (email: string) => {
  const response = await axios.delete("/user/admindashboard/usermanagement/deleteuser", { data: { email } });
  if (response.status !== 200) {
    throw new Error("Unable to delete user");
  }
  return response.data;
};




export const editUser = async (email: string, role: string) => {
  try {
    const response = await axios.put("/user/admindashboard/usermanagement/edituser", { email, role });
    if (response.status !== 200) {
      throw new Error('Failed to edit user');
    }
    return response.data;
  } catch (error) {
    console.error("Error editing user:", error);
    throw error;
  }
};