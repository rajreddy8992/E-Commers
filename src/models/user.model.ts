import mongoose from 'mongoose'

let user = new mongoose.Schema({
    userID:{
        type:Number
    },
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        require:true,
    }, 
    password:{
        type:String,
        require:true
    },
    phone:{
        type:String
    },
    address:{
        type:Array
    },
    userType:{
        type:String,
    },

})
const userModel = mongoose.model("userData",user) 
export { userModel }