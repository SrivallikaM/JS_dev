
const mongoose=require('mongoose');
module.exports=function()
{mongoose.connect('mongodb://localhost:27017/nodeAssignment',{useNewUrlParser:true}).then(()=>{
    console.log("Database connected!!");
}).catch((err)=>{
    console.log(err);
})
};