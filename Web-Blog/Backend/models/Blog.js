import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogschema = new Schema({
    //schema
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false
    },
    // user schema for which user posted this blog
    user:{
        type:mongoose.Types.ObjectId, // typw will be monoose object 
        ref:"User", // from where user belong
        required:true
    }
    
});
// export the Blog Schema
export default mongoose.model("Blog",blogschema);



