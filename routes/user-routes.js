import express from "express";
import userModel from "../models/user-model.js";
import passwordHash from "password-hash";

const userRoutes = express.Router();

userRoutes.post("/login", async (req, res) => {
  const loginDetails = req.body;

  const userExist = await userModel.find({ email: loginDetails.email });

  if (userExist.length) {
    if (
      userExist[0].email == loginDetails.email &&
      passwordHash.verify(loginDetails.password, userExist[0].password)
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
userRoutes.post("/details", async (req, res) => {
  try {
    const user = await userModel.find({ _id: req.body.userId });

    if (user) {
      res.status(200).json({ userDetails: user });
    }
  } catch (error) {
    res.status(500).json({ message: "User not found" });
  }
});

userRoutes.post("/register", async (req, res) => {
  const registrationDetails = req.body;
  var hashedPassword = passwordHash.generate(registrationDetails.password);

  const userExist = await (
    await userModel.find({ email: registrationDetails.email })
  ).length;
  if (userExist) {
    res.status(400).json({
      message: "User already exist",
    });
  } else {
    try {
      const newUser = new userModel({
        ...registrationDetails,
        password: hashedPassword,
      });
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
userRoutes.post("/addToWishlist", async (req, res) => {
  const wishlistItem = req.body;

  try {
    const result = userModel.findByIdAndUpdate(
      wishlistItem.userId,
      {
        $push: { wishlist: req.body },
      },
      (err, result) => {
        if (err) {
          console.log("errorrr", err);
        }
        res.status(200).json({ message: "Added to wishlist", data: result });
      }
    );
  } catch {
    res.status(500).json({ message: error.message });
  }
});

userRoutes.post("/removeFromWishlist", async (req, res) => {
  const wishlistItem = req.body;

  try {
    const result = userModel.findByIdAndUpdate(
      wishlistItem.userId,
      {
        $pull: { wishlist: { _id: wishlistItem._id } },
      },
      (err, result) => {
        if (err) {
          console.log("errorrr", err);
        }
        res
          .status(200)
          .json({ message: "Removed from wishlist", data: wishlistItem._id });
      }
    );
  } catch {
    res.status(500).json({ message: error.message });
  }
});
export default userRoutes;
