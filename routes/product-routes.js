import express from "express";
import productModel from "../models/product-model.js";
import userModel from "../models/user-model.js";

const productRoutes = express.Router();
productRoutes.get("/allProducts", async (req, res) => {
  try {
    const allProducts = await productModel.find({});

    res.status(200).json({ data: allProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

productRoutes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.find({ _id: id });

    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

productRoutes.post("/addItemToCart", async (req, res) => {
  try {
    const product = req.body;
    console.log(product);
    const user = await userModel.find({ _id: product.userId });
    console.log(user);
    const change = userModel.findByIdAndUpdate(
      product.userId,
      {
        $push: { cartItems: product },
      },
      (err, result) => {
        if (err) {
          console.log("errorrr", err);
        }
        res.status(200).json({ message: "Added to cart", data: result });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default productRoutes;
