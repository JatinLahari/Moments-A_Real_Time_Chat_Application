import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const userForSideBar = async(request, response, next)=>{
  try{
    const loggedInUserId = request.user._id;
    const filteredUsers = await User.find({_id: {$ne:loggedInUserId}},{fullName:true,email:true,profilePic:true});

    return response.status(200).json(filteredUsers);
  }
  catch(err){
    console.log("Failed to get users for sidebar", err.message);
    return response.status(500).json({message:"Internal Server Error"});
  }

}

export const getMessages = async (request, response,next)=>{
  try{
    const {id: userToChatWith} = request.params;
    const myId = request.user._id;

    const messages = await Message.find({
      $or:[
        {senderId:myId, receiverId: userToChatWith},
        {senderId: userToChatWith, receiverId: myId}
      ]
    })
    return response.status(200).json(messages);
  }
  catch(err){
    console.log("Failed to get Messages", err.message);
    return response.status(500).json({message:"Internal Server Error"});
  }
}

export const sendMessages = async(request, response,next)=>{
   try {
    const {text, image} = request.body;
    const {id: receiverId} = request.params;
    let myId = request.user._id;

    let imageUrl;
    if(image){
      const uploadImage = await cloudinary.uploader.upload(image);
      imageUrl = uploadImage.secure_url;
    }
    const newMessageSended = new Message({
      senderId: myId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessageSended.save();
    
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", newMessageSended);
    }

    return response.status(201).json(newMessageSended);
   } catch (error) {
    console.log("Failed to send Messages", error.message);
    return response.status(500).json({message:"Internal Server Error"});
   }
}