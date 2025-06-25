import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  text:{
    type: String
  },
  image:{
    type: String,
  },
},
{timestamps: true}
);
const Message = mongoose.model("message", messageSchema);

Message.find()
.then(()=>{
  console.log("Message Model created");
})
.catch(err=>{
  console.log("Message model not created");
});
export default Message;