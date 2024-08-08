import {Router} from "express";
import userRoutes from "./user-routes.js";
import admindashboardRoutes from "./admindashboard-routes.js";
import poweruserdashboardRoutes from "./poweruserdashboard-routes.js";
import normaluserdashboardRoutes from "./normaluserdashboard-routes.js";

const appRouter = Router();
// creating structure of our routes

appRouter.use("/user",userRoutes);    //// /domain/api/v1/user
// appRouter.use("/chat",chatRoutes);   //// /domain/api/v1/chat

appRouter.use("/admindashboard",admindashboardRoutes);                        ///    /domain/admindashboard
appRouter.use("/puserdashboard",poweruserdashboardRoutes);                ///    /domain/puserdashboard
appRouter.use("/nuserdashboard",normaluserdashboardRoutes);              

// <Route path="/admindashboard" element={<AdminDashboard />} />
// <Route path="/puserdashboard" element={<PuserDashBoard />} />
// <Route path="/nuserdashboard" element={<NuserDashboard />} />


export default appRouter;