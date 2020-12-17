const express= require('express');
const authorsRouter=express.Router();
var Bookdata= require("../model/Bookdata")
var Authordata=require("../model/Authordata")

function authorsRoutes(){
authorsRouter.get('/',function(req,res)
{
    Authordata.find().then(function(authors){
        Bookdata.find().then(function(books){res.render("authors",{obj,authors,books});})
    })
    
})
authorsRouter.get('/:id',function(req,res)
{
    const index=req.params.id
    Bookdata.find().then(function(books){Authordata.find().then(function(authors){res.render("author",{obj,books,authors,index})})});  
        
}
)
return authorsRouter
}
module.exports=authorsRoutes