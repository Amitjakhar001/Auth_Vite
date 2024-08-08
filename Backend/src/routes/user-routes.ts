import {Router} from "express";
import { getAllUsers, userCreate,userDelete,userEdit,userLogin,userLogout, verifyUser } from "../controllers/user-controllers.js";     
import { emailValidator, loginValidator, usercreateValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";
const userRoutes = Router();

userRoutes.get("/",getAllUsers);
// userRoutes.post("/signup");

userRoutes.post("/admindashboard/usermanagement/createuser",validate(usercreateValidator),userCreate);
userRoutes.put("/admindashboard/usermanagement/edituser",validate(emailValidator),userEdit);
// userRoutes.delete("/admindashboard/usermanagement/deleteuser",validate(usercreateValidator),userCreate);
userRoutes.delete("/admindashboard/usermanagement/deleteuser", verifyToken, validate(emailValidator), userDelete);
// userRoutes.post("/usercreate",validate(usercreateValidator),userCreate);
// userRoutes.post("/signup",userSignup);
userRoutes.post("/login",validate(loginValidator),userLogin);
userRoutes.get("/auth-status",verifyToken,verifyUser);
userRoutes.get("/logout", verifyToken, userLogout);


export default userRoutes;


