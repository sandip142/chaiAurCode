import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
          
cloudinary.config({ 
  cloud_name:process.env.CLOUD_NAME, 
  api_key:process.env.API_KEY , 
  api_secret:  process.env.API_SECRET
});

const UploadOnCloudynary = async (locatPath)=>{
      try{

        //upload the file
         if(!locatPath) return null
         const response =await cloudinary.uploader.upload(locatPath,{
            resource_type:'auto'
         })
       //file uploaded succesfully
       console.log('file uploaded succesfully:',response.url)
       return response

      }catch(error){
              fs.unlinkSync(locatPath) //remove the file fromlocal storage which are not get uploaded 
      }
}

export {UploadOnCloudynary}