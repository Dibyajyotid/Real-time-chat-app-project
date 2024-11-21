import express from "express"
import dotenv from "dotenv"
import authRoutes from "../src/routes/auth.route.js"
import { connectDB } from "../src/lib/db.js"
import cookieParser from "cookie-parser"

const app = express()
dotenv.config()

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`server is running on localhost:${PORT}`)
    connectDB()
})