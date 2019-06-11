const mongoose=require('mongoose');

const messageSchema=mongoose.Schema({
    "message":{
        type:String,
    
    },
    "markAsImp":{
        type:Boolean,
        default:false
   },
   "Sender":{
       type:String,
   },
   "Receiver":{
    type:String,
}
});
const usersSchema=mongoose.Schema({
    "username":{
        type:String,
        required:[true,'Please provide username!!']
    },
    "password":{
        type:String,
        required:[true,'Please provide username!!']
   }
});

const messageModel=mongoose.model('messages',messageSchema);


const usersModel=mongoose.model('users',usersSchema);

module.exports=
{
    messages:messageModel,
    users:usersModel
}
