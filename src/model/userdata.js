// const { mongo } = require("mongoose");

const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/Library")
const Schema= mongoose.Schema;

const UserSchema= new Schema({
    Name:String,
    Email:String,
    Password:String        
})


var Userdata=mongoose.model("userdata",UserSchema);
module.exports=Userdata;

