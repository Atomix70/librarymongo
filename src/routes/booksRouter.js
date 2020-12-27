const express= require('express');
const booksRouter=express.Router();
var Bookdata= require("../model/Bookdata")
var Authordata=require("../model/Authordata")

function booksRoutes(obj){
booksRouter.get('/',function(req,res)
{
    Bookdata.find().then(function(books){
    Authordata.find().then(function(author){
        // console.log(books[0])
        // console.log(author)
        res.render("books",{obj,books,author});
    })    
    })
    
})
booksRouter.get('/:id',function(req,res)
{
// books=[]
// authors=[]
const index=req.params.id;
Bookdata.find().then(function(books){
    Authordata.find().then(function(authors){
        res.render("book",{obj,books,authors,index})
    })
})

}
)
return booksRouter;
}

module.exports=booksRoutes;