import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cookieParser())

//routes Declaration
import userRouter from './Routes/user.routes.js'

app.use('/api/v1/users',userRouter)

export {app}