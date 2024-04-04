import { asyncHandler } from "../../Utils/asyncHandler.js";
import { ApiError } from "../../Utils/apiError.js";
import {User} from "../Model/user.model.js"
import { UploadOnCloudynary } from "../../Utils/cloudinary.js";
import { ApiResponse } from "../../Utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // res.status(200).json({
    //     message:'ok'
    // }),
    const { email, fullname, username, password } = req.body
    console.log("email", email)
    if ([fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
     throw new ApiError(400,"Allfield are required")
    }
  const existedUser=User.findOne({
    $or:[{email},{username}]
  })

  if(existedUser){
    throw new ApiError(409,'user already exist')
  }
  
  const avatarLocalPath=req.files?.avatar[0]?.path
  const coverImageLocalPath=req.files?.coverImage[0]?.path

  if(!avatarLocalPath){
    throw new ApiError(404,'Avatar is not uploaded')
  }

const Avatar= await UploadOnCloudynary(avatarLocalPath)
const coverImage = await UploadOnCloudynary(coverImageLocalPath)

if(!Avatar){
    throw new ApiError(400,'Avatar is not Uploaded on cloudanary')
}

const userData =await create.User({
    username,
    password,
    fullname,
    email,
    avatar:Avatar.url,
    coverImage: coverImage?.url||''
})

const userCreated = await User.findById(userData._id).select(
    "-password -refreshToken"
)

if(!userCreated){
    throw new ApiError(400,'error while regestering the user')
}

return res.status(201).json(
   ApiResponse(200,userCreated,"user Created Sucessfully")
)
    
})

export { registerUser }