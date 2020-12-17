const express= require('express');
const adminRouter=express.Router();
var Bookdata= require("../model/Bookdata")
var Authordata=require("../model/Authordata")

function adminRoutes(obj){
adminRouter.get('/',function(req,res)
{
    Bookdata.find().then(function(books){Authordata.find().then(function(authors){res.render("admin",{obj,books,authors})})})
    
}
)
adminRouter.get('/addauthor',function(req,res)
{
    // Bookdata.find().then(function(books){Authordata.find().then(function(author){})})
    res.render("addauthor",obj.nav)
}
)
adminRouter.get('/addbook',function(req,res)
{

    // Bookdata.find().then(function(books){Authordata.find().then(function(author){})})
    res.render("addbook",obj.nav)
}
)
adminRouter.get('/addbook/add',function(req,res)
{
    
    var book={
    Image:"images/"+req.query.Image,
    Title:req.query.Title,
    Author:req.query.Author,
    Country:req.query.Country,
    Language:req.query.Language,
    Pages:req.query.Pages,
    Year:req.query.Year,
    Link:req.query.Link
    }
    var buk=Bookdata(book);
    buk.save();
    res.redirect('/admin/admin-books')     
}
)
adminRouter.get('/addauthor/add',function(req,res)
{

    // res.send("i am in")
    var author={
    Name:req.query.Name,
    Description:req.query.Description,
    Image:"images/"+req.query.Image,
    // Country:req.query.Country,
    // Language:req.query.Language,
    // Pages:req.query.Pages,
    // Year:req.query.Year,
    // Wiki:req.query.Wiki
    }
    var aut=Authordata(author);
    aut.save();
    res.redirect('/admin/admin-authors')
}
)

adminRouter.get("/admin-books/admin-book/update/:id",function(req,res){

    const index=req.params.id;
    Bookdata.findOne({_id:index}).then(function(book){
        res.render("update",{obj,book,index})
        // console.log(book.Title)
    })    
})

adminRouter.get("/admin-authors/admin-author/update/:id",function(req,res){

    const index=req.params.id;
    Authordata.findOne({_id:index}).then(function(author){
        res.render("update2",{obj,author,index})
        console.log(author.Name)
    })    
})









adminRouter.get("/admin-books/admin-book/delete/:id",function(req,res){

    const index=req.params.id;
    Bookdata.findOneAndRemove({_id:index},function(err,doc){
        if(err){
            res.send(err)
        }
        else{
            res.redirect("/admin/admin-books")
        }
    })
        // console.log(book.Title)
    // })    
})


adminRouter.get("/admin-authors/admin-author/delete/:id",function(req,res){

    const index=req.params.id;
    Authordata.findOneAndRemove({_id:index},function(err,doc){
        if(err){
            res.send(err)
        }
        else{
            res.redirect("/admin/admin-authors")
        }
    })
        // console.log(book.Title)
    // })    
})






adminRouter.get("/admin-books/admin-book/update/updated/:id",function(req,res){

    const index=req.params.id;
    // console.log(req.query.Title)
    var updateobj={
    Image:"images/"+req.query.Image,
    Title:req.query.Title,
    Author:req.query.Author,
    Country:req.query.Country,
    Language:req.query.Language,
    Pages:req.query.Pages,
    Year:req.query.Year,
    Link:req.query.Link
    }
    Bookdata.findOneAndUpdate({_id:index},updateobj,{new:true},(err,doc)=>{
        if(err){}
    else{
        res.redirect("/admin/admin-books/"+index)
    }
    })
   
})

adminRouter.get("/admin-authors/admin-author/update/updated/:id",function(req,res){

    const index=req.params.id;
    console.log(req.query.Name)
    var updateobj={
    Image:"images/"+req.query.Image,
    Name:req.query.Name,
    Description:req.query.Description
    }
    Authordata.findOneAndUpdate({_id:index},updateobj,{new:true},(err,doc)=>{
        if(err){}
    else{
        res.redirect("/admin/admin-authors/"+index)
    }
    })
   
})


























// 
adminRouter.get('/admin-book',function(req,res)
{

    Bookdata.find().then(function(books){Authordata.find().then(function(authors){res.render("admin-book",{obj,books,authors})})})
    
}
)
adminRouter.get('/admin-books',function(req,res)
{

    Bookdata.find().then(function(books){Authordata.find().then(function(authors){res.render("admin-books",{obj,books,authors})})})
    
}
)

adminRouter.get('/admin-authors',function(req,res)
{

    Bookdata.find().then(function(books){Authordata.find().then(function(authors){res.render("admin-authors",{obj,books,authors})})})
    
}

)
adminRouter.get('/admin-authors/:id',function(req,res)
{
    const index=req.params.id;
    // obj.index=index;
    // console.log(index)
    // res.render("author",obj)
    Bookdata.find().then(function(books){Authordata.find().then(function(authors){res.render("admin-author",{obj,books,authors,index})})})
    
}
)
adminRouter.get('/admin-books/:id',function(req,res)
{
    const index=req.params.id;
    // obj.index=index;
    // console.log(index)
    // res.render("author",obj)
    Bookdata.find().then(function(books){Authordata.find().then(function(authors){ res.render("admin-book",{obj,books,authors,index})})})
   
}
)

return adminRouter;
}

module.exports=adminRoutes;