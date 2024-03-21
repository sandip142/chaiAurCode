
import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDb = async()=>{
     try{
         const ConnectionDb = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
         console.log(`mongoDb succesfully connected on: ${ConnectionDb.connection.host}`)
     }catch(error){
        console.log(`Mongodb is not Connected ${error}`)
        process.exit(1)
     }
}

export default connectDb