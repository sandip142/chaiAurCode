import dotenv from 'dotenv'
import connectDb from "./Db/Auth.js" 
dotenv.config({path:"./env"})
import { app } from './app.js'

// app.use(cookie())


connectDb().then(()=>{
   app.listen(process.env.PORT|| 3000,()=>{
    console.log(`listen on port ${process.env.PORT}`)
   })
}).catch((err)=>{
    console.log("not connected "+err)
})

