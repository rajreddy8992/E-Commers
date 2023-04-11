const mongoose = require("mongoose");

let notifications = new mongoose.Schema({
    userID:{
        type:String

    },
    assignedTo:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    },
    isRead:{
        type:Number,
        default: 0
    },
    assignedToID:{
        type:String,
    },
    isActive:{
        type:String,
        default: 0
    },
    isDeleted:{
        type:String,
        default:0
    }
})
const notificationmodel = mongoose.model("notifications",notifications) 
export { notificationmodel }