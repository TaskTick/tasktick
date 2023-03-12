import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import router from "./server/routes/auth.js"
import routerPatient from "./server/routes/patient.js" 
import dotenv from "dotenv"
import morgan from "morgan"
import User from "./models/user.js";
import { hashPassword, comparePassword } from "./server/helpers/auth.js";
import jwt from "jsonwebtoken";

dotenv.config()

const m = morgan
const app = express()

const databaseUrl = "mongodb+srv://tasktickapp:Aa123456@cluster0.1wyci7j.mongodb.net/info"
const JWTkey = "2420EB49E87E274F1E407BF2DE1EE36B09A142C2E6F895054B2284827EAC01D0"

mongoose.connect(databaseUrl).then(() => console.log("DB connected")).catch((err) => console.log("DB Failed to Connect", err))
//haytham_t
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(m("dev"))

app.use("/login", router)
app.use("/patient",routerPatient)
app.use("/api", router)

/**
 * Used to check if connection is receieved from server upon starting the application
 */
app.get("/hello", (req, res) => {
    res.send("hello world from the API from index.mjs")
})

/**
 * Login authentication for users
 * @params email,password
 */
// app.post("/signin", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         // check if our db has user with that email
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.json({
//                 error: "No user found",
//             });
//         }
//         // check password
//         const match = await comparePassword(password, user.password);
//         if (!match) {
//             return res.json({
//                 error: "Wrong password",
//             });
//         }
//         // create signed token
//         const token = jwt.sign({ _id: user._id }, JWTkey, {
//             expiresIn: "7d",
//         });
//         user.password = undefined;
//         user.secret = undefined;
//         res.json({
//             token,
//             user,
//         });
//     } catch (err) {
//         console.log(err);
//         return res.status(400).send("Error. Try again.");
//     }
// })


app.listen(8000, () => console.log("server running on port 8000"))
