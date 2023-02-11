import express from "express";
import userModel from "../models/user-model.js";
import passwordHash from "password-hash";

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

userRoutes.post("/register", async (req, res) => {
  const registrationDetails = req.body;
  var hashedPassword = passwordHash.generate(registrationDetails.password);
  console.log("hashedPassword", hashedPassword);
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

  console.log("wishlistItem", wishlistItem);
  try {
    userModel.findByIdAndUpdate(
      wishlistItem.userId,
      {
        $push: { wishlist: req.body },
      },
      (err, result) => {
        if (err) {
          console.log("errorrr", err);
        }
        res
          .status(200)
          .json({ message: "Added to wishlist", data: wishlistItem._id });
      }
    );
  } catch {
    res.status(500).json({ message: error.message });
  }
});

userRoutes.post("/removeFromWishlist", async (req, res) => {
  const wishlistItem = req.body;

  console.log("wishlistItem", wishlistItem);
  try {
    userModel.findByIdAndUpdate(
      wishlistItem.userId,
      {
        $pull: { wishlist: wishlistItem._id },
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
