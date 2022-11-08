import mongoose from "mongoose";
const Schema = mongoose.Schema;
const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId, // typw will be monoose object
    ref: "Users", // from where user belong
    required: true,
  },
  ShortDescription: {
    type: String,
    required: false,
    maxlength: 35,
  },
  image: {
    type: String,
    required: false,
  },
  PublishedDate: {
    type: String,
    required: false,
  },
});
export default mongoose.model("Blogs", blogSchema);
//
//
