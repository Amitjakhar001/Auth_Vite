import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import {compare, hash} from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //get all users
      const users = await User.find();
      return res.status(200).json({ message: "OK", users });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };
  

/// we don't have to signup user bcoz admin can only create user

export const userCreate = async (
// export const userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user creation
      const {name,email,password,role} = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(401).send("User already registered");
      const hashedPassword = await hash(password,10);

      const user = new User({name,email,password:hashedPassword,role});
      await user.save();

      return res.status(201).json({ message: "OK", name: user.name, email: user.email, role:user.role });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };


      export const userLogin = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          //user login
          const { email, password } = req.body;
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(401).send("User not registered");
          }
          const isPasswordCorrect = await compare(password, user.password);
          if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
          }
        
          // create token and store cookie
      
          res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
          });
      
          const token = createToken(user._id.toString(), user.email, "7d");
          const expires = new Date();
          expires.setDate(expires.getDate() + 7);
          res.cookie(COOKIE_NAME, token, {
            // res.cookie("auth-token",token,{
            path: "/",
            domain: "localhost",                       /// we will change this in production this will something like leetcode.com
            expires,
            httpOnly: true,
            signed: true,
          });
      
          return res
            .status(200)
            .json({ message: "OK", name: user.name, email: user.email, role:user.role });
        } catch (error) {
          console.log(error);
          return res.status(200).json({ message: "ERROR", cause: error.message });
        }
      };
      





      export const verifyUser = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          //user token check
          const user = await User.findById(res.locals.jwtData.id);
          if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
          }
          if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
          }
          return res
            .status(200)
            .json({ message: "OK", name: user.name, email: user.email,role:user.role });
        } catch (error) {
          console.log(error);
          return res.status(200).json({ message: "ERROR", cause: error.message });
        }
      };
      



      export const userLogout = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          //user token check
          const user = await User.findById(res.locals.jwtData.id);
          if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
          }
          if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
          }
      
          res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
          });
      
          return res
            .status(200)
            .json({ message: "OK", name: user.name, email: user.email,role:user.role });
        } catch (error) {
          console.log(error);
          return res.status(200).json({ message: "ERROR", cause: error.message });
        }
      };
      




      export const userDelete = async (req, res) => {
        try {
          const { email } = req.body;
          const userToDelete = await User.findOne({ email });
      
          if (!userToDelete) {
            return res.status(404).send("User not found");
          }
          if (userToDelete.role === 'admin') {
            return res.status(403).send("Cannot delete admin users");
          }
      
          await User.deleteOne({ email });
          res.status(200).send("User deleted successfully");
        } catch (error) {
          console.error("Deletion error:", error);
          res.status(500).send("Server error");
        }
      };
      

      // export const userEdit = async (req, res) => {
      //   try {
      //     const { email, role } = req.body;
      //     const userToUpdate = await User.findOne({ email });
      
      //     if (!userToUpdate) {
      //       return res.status(404).send("User not found");
      //     }
      
      //     // Update user's role
      //     userToUpdate.role = role || userToUpdate.role;
      
      //     await userToUpdate.save();
      
      //     res.status(200).json({ message: "User role updated successfully", user: userToUpdate });
      //   } catch (error) {
      //     console.error("User role update error:", error);
      //     res.status(500).send("Server error");
      //   }
      // };
      


      export const userEdit = async (req, res) => {
        try {
          const { email, role } = req.body;
          const userToEdit = await User.findOne({ email });
      
          if (!userToEdit) {
            return res.status(404).send("User not found");
          }
      

          if (userToEdit.role === 'admin') {
            // Check if the new role is different from admin
            if (role === 'admin') {
              return res.status(403).send("This user is currently an admin");
            }
          }

          //// userToEdit.role is current role of user and role is role that admin user wants to give to user


          // Check if the user being edited is currently an admin
          /// check if currecnt role is admin and we are trying to update some role that is not admin operator !== not equal to



          if (userToEdit.role === 'admin') {
            // Check if the new role is different from admin
            //// this is code if we comment this out then we can change admin's role also to normaluser or poweruser
            if (role !== 'admin') {      
              return res.status(403).send("Cannot change admin's role");
            }
          }

          
          if (userToEdit.role === 'poweruser') {
            // Check if the new role is different from admin
            if (role === 'poweruser') {
              return res.status(403).send("This user is currently an poweruser");
            }
          }
          if (userToEdit.role === 'normaluser') {
            // Check if the new role is different from admin
            if (role === 'normaluser') {
              return res.status(403).send("This user is currently an normaluser");
            }
          }


          // Update the user's role
          userToEdit.role = role;
          await userToEdit.save();
      
          res.status(200).send("User updated successfully");
        } catch (error) {
          console.error("Update error:", error);
          res.status(500).send("Server error");
        }
      };
      


      