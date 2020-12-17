const { mongo } = require("mongoose");

const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/Library")

const Schema= mongoose.Schema;

const BookSchema= new Schema({
    Title:String,
    Author:String,
    Country:String,
    Language:String,   
    Pages:String,
    Year:Number,
    Link:String,
    Image:String         
})


var Bookdata=mongoose.model("bookdata",BookSchema);
module.exports=Bookdata;
