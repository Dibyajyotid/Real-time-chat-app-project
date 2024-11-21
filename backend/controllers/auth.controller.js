import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    const {email, fullName, password} = req.body
    try{
        //in this we will signup/create the user, hash their password and create a toen to let them know that they are authenticated

        //checking if all the fields are filledor not
        if(!fullName || !email || !password){
            res.status(400).json({message: "All fields are required"})
        }

        //checking if user's password is less than 6
        if (password.length < 6) {
            return res.status(400).json({
                messsage: "Password must be at least 6 characters"
            })
        }

        //checking if the user with the given email is already exist or not
        const user = await User.findOne({email})
        //if exist
        if (user) return res.status(400).json({message: "Email already exists"})

        //if not exists
        //hash the password
        //first create a salt = random string
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //now we willcreate a new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        })

        if (newUser){
            //generate jwttoken here
            generateToken(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                profilePicture: newUser.profilePicture
            })
        } else {
            res.status(400).json({message: "invalid User details"})
        }

    }catch(error){
        console.log("signup Controller Error: ",error)
        res.status(500).json({message: "Internal Server Error: ",error})
    }
}

export const login = (req, res) => {
    res.send("login page")
}

export const logout = (req, res) => {
    res.send("logout page")
}