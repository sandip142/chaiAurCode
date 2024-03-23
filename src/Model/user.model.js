import mongoose  from "mongoose";
import bcrypt from "bcrypt"
import  Jwt  from "jsonwebtoken";

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
    },
    fullname:{
        type:String,
        required:true,
        lowercase:true,
        index:true
    },
    avatar:{
        type:String,
        required:true,
    },
    coverImage:{
        type:String
    },
    watchHistory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    },
    password:{
        type:true,
        required:true,
    },
    refreshToken:{
        type:String,
    }

},{timestamps:true})


//method to encrypt the password
userSchema.pre("save",async function(next){
   if(!this.isModified('password')) return next()
   this.password = bcrypt.hash(this.password,10)
 next()
})

//method to decrypt the password and check password and retun the boolean values
userSchema.methods.IsPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    Jwt.sign(
        {
            _id :this._id,
             email:this.email,
             fullname:this.fullname,
             username:this.username
        },
        process.env.ACCESS_TOKEN_SECRET, 
        {
              expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
         
    )
}

userSchema.methods.generateRefreshToken =function(){
    Jwt.sign(
        {
            _id :this._id,
        },
        process.env.REFRESH_TOKEN_SECRET, 
        {
              expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
         
    )
}


export const user = mongoose.model('User',userSchema)