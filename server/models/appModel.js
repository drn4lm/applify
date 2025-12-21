import mongoose from "mongoose";

const appSchema = new mongoose.Schema({
    position:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    jobID:{
        type:String,
        required:false
    },
    date:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required:true
    }
});

export default mongoose.model("Applications", appSchema);