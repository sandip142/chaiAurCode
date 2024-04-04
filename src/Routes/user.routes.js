import { Router } from "express";
import { registerUser } from "../Controller/register.controller.js";
import { upload } from "../Middleware/multer.middleware.js";

const router = Router()

router.route("/register").post(upload.fields([
    {
        name:'avatar',
        maxCount:1
    },
    {
        name:'coverImage',
        maxCount:1
    }
]),registerUser)

export default router