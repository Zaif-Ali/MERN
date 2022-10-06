// const mongoose = require('mongoose');
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  blogs: [
    {
      //   required:true,
      type: mongoose.Types.ObjectId,
      ref: "Blog",
    },
  ],
});
export default mongoose.model("User", userSchema);
