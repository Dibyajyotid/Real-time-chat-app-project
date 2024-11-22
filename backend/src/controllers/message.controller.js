import cloudinary from "../lib/cloudinary.js"
import Message from "../models/message.model.js"
import User from "../models/user.model.js"

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password") //this code will find all the users except the logged in user $ne = not equal to and we are fatching everything except the password

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.error("Error in getUsersForSidebar controler: ", error.message)
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChaId} = req.params
        const senderId = req.user._id

        const messages = await Message.find({
            $or: [
                {senderId: senderId, receiverId: receiverId},
                {senderId: userToChaId, receiverId: senderId}
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message)
        req.status(500).json({error: "Internal Server Error"})
    }
}

export const sendMessage = async(req, res) => {
    try {
        //grabbing the text and image from the body
        const {text, image} = req.body

        //grabbing the receiver id fromthe params
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let imageUrl
        if (image) {
            //upload the image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image)
            
            //saving the secure image link in the imageurl variable
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })

        await newMessage.save()

        // todo realtime functionality is implemented here using Socket.io

        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}