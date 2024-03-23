import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    videoFile:{
        type:String, //cloudnary Url
        required:true
    },
    thumbnail:{
        type:String, //cloudnary Url
        required:true
    },
    title:{
        type:String, //cloudnary Url
        required:true
    },
    discretion:{
        type:String, //cloudnary Url
        required:true
    },
    duration:{
        type:String, //cloudnary Url
        required:true
    },
    views:{
        type:String,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},{timestamps:true})

export const Video = mongoose.model('Video',videoSchema)