import express from "express"
import {signup,signin} from "../controllers/auth.js"

const router = express.Router()

router.get("/",(req,res)=>{
    res.send("hello world from auth.js")
});



router.post("/signup",signup)
router.post("/signin",signin)
//router.post("/forgot-password",forgotPassword)
//router.post("/reset-password",resetPassword)

export default router;