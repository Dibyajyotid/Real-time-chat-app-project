import express from "express"
import dotenv from "dotenv"
import bodyParser from 'body-parser'
import authRoutes from "../src/routes/auth.route.js"
import messageRoutes from "../src/routes/message.route.js"
import { connectDB } from "../src/lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { app, server } from "./lib/socket.js"

//const app = express()
dotenv.config()



app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

const PORT = process.env.PORT

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

server.listen(PORT, () => {
    console.log(`server is running on localhost:${PORT}`)
    connectDB()
})