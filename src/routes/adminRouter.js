const express= require('express');
const adminRouter=express.Router();
var Bookdata= require("../model/Bookdata")
var Authordata=require("../model/Authordata");
const { update } = require('../model/Bookdata');
const multer =require("multer")
const path =require("path")


// multer storage engine
const storage=multer.diskStorage({
    destination:"./public/images/",
    filename: function(req,file,cb){
        cb(null,file.originalname+"-"+Date.now()+path.extname(file.originalname))
    }
});
const upload=multer({
    storage:storage
}).single("Image")

// end


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
adminRouter.post('/addbook/add',function(req,res)
{
    // multer
    
    upload(req,res,(err)=>{
        if(err){
            res.send(err)
        }
        else
        {
            console.log(req.file)
            var book={
                Image:"images/"+req.file.filename,
                Title:req.body.Title,
                Author:req.body.Author,
                Country:req.body.Country,
                Language:req.body.Language,
                Pages:req.body.Pages,
                Year:req.body.Year,
                Link:req.body.Link
                }
                console.log(book)
                var buk=Bookdata(book);
                buk.save();
                res.redirect('/admin/admin-books')
        }
    })

    // 
    
    // var book={
    // Image:"images/"+req.body.Image,
    // Title:req.body.Title,
    // Author:req.body.Author,
    // Country:req.body.Country,
    // Language:req.body.Language,
    // Pages:req.body.Pages,
    // Year:req.body.Year,
    // Link:req.body.Link
    // }
    // console.log(book)
    // var buk=Bookdata(book);
    // buk.save();
    // res.redirect('/admin/admin-books')     
}
)
adminRouter.post('/addauthor/add',function(req,res)
{
    upload(req,res,(err)=>{
        if(err){
            res.send(err)
        }
        else
        {
            console.log(req.file)
            var author={
                Name:req.body.Name,
                Description:req.body.Description,
                Image:"images/"+req.file.filename,
                }
                var aut=Authordata(author);
                aut.save();
                res.redirect('/admin/admin-authors')
        }
    })

    // var author={
    // Name:req.body.Name,
    // Description:req.body.Description,
    // Image:"images/"+req.body.Image,
    // }
    // var aut=Authordata(author);
    // aut.save();
    // res.redirect('/admin/admin-authors')
}
)

adminRouter.get("/admin-books/admin-book/update/:id",function(req,res){
    // console.log()
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






adminRouter.post("/admin-books/admin-book/update/updated/:id",function(req,res){

    const index=req.params.id;
    upload(req,res,(err)=>{
        if(err){
            res.send(err)
        }
        else
        {  
            // console.log(req.file)
            // console.log(req.file.filename+"test1")
            var updateobj=
            {
            Image:"",
            Title:req.body.Title,
            Author:req.body.Author,
            Country:req.body.Country,
            Language:req.body.Language,
            Pages:req.body.Pages,
            Year:req.body.Year,
            Link:req.body.Link
            }
        
            if(typeof req.file=="undefined")
            { 
            
                Bookdata.find({_id:index}).then(function(data)
                {
                    
                    updateobj.Image=data[0].Image;
                    // console.log(updateobj)
                    update(updateobj);
                })
            }
            else 
            {   
                updateobj.Image="images/"+req.file.filename;
                // console.log(updateobj)
                update(updateobj)
            }
            function update(upd)
            {
                Bookdata.findOneAndUpdate({_id:index},upd,{new:true},(err,doc)=>{
                if(err){}
            else
                {
                res.redirect("/admin/admin-books/"+index)
                }
            })
            }
            }
    })
    
    // var updateobj={
    // Image:"images/"+req.body.Image,
    // Title:req.body.Title,
    // Author:req.body.Author,
    // Country:req.body.Country,
    // Language:req.body.Language,
    // Pages:req.body.Pages,
    // Year:req.body.Year,
    // Link:req.body.Link
    // }

    // if(updateobj.Image=="images/")
    // { 
    
    //     Bookdata.find({_id:index}).then(function(data)
    //     {
            
    //         updateobj.Image=data[0].Image;
    //         console.log("1")
    //         update(updateobj);
    //     })
    // }
    // else update(updateobj)
    // function update(upd)
    // {
    //     Bookdata.findOneAndUpdate({_id:index},upd,{new:true},(err,doc)=>{
    //     if(err){}
    // else
    //     {
    //     res.redirect("/admin/admin-books/"+index)
    //     }
    // })
    // }
    
   
})

adminRouter.post("/admin-authors/admin-author/update/updated/:id",function(req,res){

    const index=req.params.id;
    upload(req,res,(err)=>{
        if(err){
            res.send(err)
        }
        else
        { 
            var updateobj=
            {
            Image:"",
            Name:req.body.Name,
            Description:req.body.Description
            }
            if(typeof req.file=="undefined"){
        
                Authordata.find({_id:index}).then(function(data)
                {
                    
                    updateobj.Image=data[0].Image;
                    // console.log("1")
                    update(updateobj);
                })
            }
            else {
                updateobj.Image="images/"+req.file.filename;
                // console.log(updateobj)
                update(updateobj);
            }
            
            function update(upd)
            {
            Authordata.findOneAndUpdate({_id:index},upd,{new:true},(err,doc)=>{
                if(err){}
            else{
                res.redirect("/admin/admin-authors/"+index)
            }
            })
            }
           
         }
        })
    
    // var updateobj=
    // {
    // Image:"images/"+req.query.Image,
    // Name:req.body.Name,
    // Description:req.body.Description
    // }
    // if(updateobj.Image=="images/"){

    //     Authordata.find({_id:index}).then(function(data)
    //     {
            
    //         updateobj.Image=data[0].Image;
    //         console.log("1")
    //         update(updateobj);
    //     })
    // }
    // else update(updateobj)
    
    // function update(upd)
    // {
    // Authordata.findOneAndUpdate({_id:index},upd,{new:true},(err,doc)=>{
    //     if(err){}
    // else{
    //     res.redirect("/admin/admin-authors/"+index)
    // }
    // })
    // }
   
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