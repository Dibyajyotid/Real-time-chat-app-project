import express from "express"
import dotenv from "dotenv"
import authRoutes from "../routes/auth.route.js"
import { connectDB } from "../lib/db.js"

const app = express()
dotenv.config()

app.use(express.json())

const PORT = process.env.PORT

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`server is running on localhost:${PORT}`)
    connectDB()
})