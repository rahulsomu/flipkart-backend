import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  wishlist: {
    type: Array,
  },
  orderHistory: {
    type: Array,
  },
  savedAddresses: {
    type: Array,
  },
  cartItems: {
    type: Array,
  },
});
const userModel = mongoose.model("User", userSchema);
export default userModel;
