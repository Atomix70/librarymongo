const express= require('express');
const { find } = require('../model/Userdata');
const loginRouter=express.Router();
const Userdata=require("../model/Userdata")

function loginRoutes(obj){
loginRouter.get('/',function(req,res)
{
    res.render("login",obj.nav)
})

loginRouter.post('/signup',function(req,res)
{
    var item={
        Name:req.body.suname,
        Email:req.body.sumail,
        Password:req.body.supp
    }
console.log(item)
var user=Userdata(item);
user.save()
res.redirect("/")
}
)

loginRouter.post("/signin",function(req,res){
    
   Userdata.find({Email:req.body.simail,Password:req.body.sip}).then(function(user){
       console.log(user.length)
       if(user.length==1){
           if(user[0].Email=="admin@gmail.com"&&user[0].Password=="admin")
           {
               res.redirect("/admin")
           }
           else
           res.redirect("/books")
       }
       else
       {    
    
           res.render("alerter")
       }
   })
    
    }
)
return loginRouter
}
module.exports=loginRoutes;