const express= require('express');
const { find } = require('../model/Userdata');
const loginRouter=express.Router();
const Userdata=require("../model/Userdata")
// const swal=require("sweetalert")
// import swal from sweetAlert

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
    // console.log(req.body.simail)
    // console.log(req.body.sip)
   Userdata.find({Email:req.body.simail,Password:req.body.sip}).then(function(user){
       console.log(user.length)
       if(user.length==1){
           res.redirect("/books")
       }
       else
       {    
        //    swal("wrong credentials")
           res.redirect("/login")
       }
   })
    
    }
)
return loginRouter
}
module.exports=loginRoutes;