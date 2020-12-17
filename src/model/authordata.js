// const { mongo } = require("mongoose");

const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/Library")
const Schema= mongoose.Schema;

const AuthorSchema= new Schema({
    Name:String,
    Description:String,
    Image:String        
})


var Authordata=mongoose.model("authordata",AuthorSchema);
module.exports=Authordata;
