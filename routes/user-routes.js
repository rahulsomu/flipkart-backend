import express from "express";
import userModel from "../models/user-model.js";

const userRoutes = express.Router();
userRoutes.get("/details", (req, res) => {
  res.json({ name: "rahul" });
});

userRoutes.post("/login", async (req, res) => {
  const loginDetails = req.body;
  console.log(loginDetails);
  const userExist = await userModel.find({ email: loginDetails.email });
  console.log(userExist);
  if (userExist.length) {
    if (
      userExist[0].email == loginDetails.email &&
      userExist[0].password == loginDetails.password
    ) {
      res.status(200).json({
        message: "Login SuccessFull",
        userDetails: userExist,
      });
    } else {
      res.status(400).json({
        message: "Invalid Email/Password",
      });
    }
  } else {
    res.status(400).json({
      message: "User Does Noe exist!",
    });
  }
});

userRoutes.post("/register", async (req, res) => {
  const registrationDetails = req.body;
  const userExist = await (
    await userModel.find({ email: registrationDetails.email })
  ).length;
  if (userExist) {
    res.status(400).json({
      message: "User already exist",
    });
  } else {
    try {
      const newUser = new userModel(registrationDetails);
      await newUser.save();
      res.status(200).json({
        message: "User Registered Successfully",
        user: registrationDetails,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
});

export default userRoutes;