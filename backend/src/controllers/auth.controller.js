import cloudinary from "../lib/cloudinary.js"
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

export const login = async (req, res) => {
    const {password, email} = req.body
    try{

        //finding the user in the database
        const user = await User.findOne({email})
        
        //if the user does not exists return this
        if(!user) {
            return res.status(400).json({message:"Invalid Credentials"})
        }

        //comparing the password entered with the hashed password stored in the DB 
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        //if the password is not matched 
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        //if the password is matched we will generate a token and send it to the browser in cookies
        //generating token
        generateToken(user._id, res)

        //sending the json data
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePicture: user.profilePicture,
        })

    }catch(error){
        console.log("Error in login credentials: ",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

//in the logout we will just clear the cookies
export const logout = (req, res) => {
    try{
        //clearing the cookies
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({message: "Logged Out Successfully"})
    }catch(error){
        console.log("Error in logout Controller: ", error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

//updating profile picture function
export const updateProfilePicture = async (req, res) => {

    try {
        const {profilePic} = req.body
        const userId = req.user._id

        if(!profilePic) {
            return res.status(400).json({message:"Profile Picture is Required"})
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUdate(userId, {profilePicture: uploadResponse.secure_url}, {new:true})

        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("Errorin updateprofile: ", error)
        res.status(500).json({message:"Internal server Error"})
    }
}

export const checkAuth = (req, res) => {
    try{
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth Controler: ", error.message)
        res.status(500).jsopn({message:"Internl Server Error"})
    }
}