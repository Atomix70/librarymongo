// const fs = require('fs')
// let rawdata1 = fs.readFileSync('books.json');
// let books = JSON.parse(rawdata1);
// console.log(books);
// console.log(books.length)
// let rawdata2 = fs.readFileSync('authors.json');
// let authors = JSON.parse(rawdata2);
// authors=[]
// for(i=0;i<books.length;i++){
// authors.push(books[i].author)
// }
// let uniqueauthors = [...new Set(authors)];
// console.log(uniqueauthors)
// console.log(uniqueauthors.length)
// console.log(authors);
var Bookdata= require("./src/model/Bookdata")
var Authordata=require("./src/model/Authordata")

const express= require('express');
const { urlencoded } = require("express");
const app= express();
const port=process.env.PORT||2000

obj={

    nav:[
            {link:"/",name:'Home'},
            {link:"/books",name:'Books'},
            {link:"/authors",name:'Authors'}
        ],
    title:"Library",
    // booksinobj:[]
    }
// obj.booksinobj.push(books)
// obj.booksinobj.push(authors)
//  console.log(obj.booksinobj[1][2].author.replace(/ /g,''))


const booksRouter= require("./src/routes/booksRouter")(obj);
const authorsRouter= require("./src/routes/authorsRouter")(obj);
const adminRouter= require("./src/routes/adminRouter")(obj);
const loginRouter= require("./src/routes/loginRouter")(obj);





app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));

app.set('view engine','ejs');
app.set('views',__dirname+'/src/views');

app.use('/books',booksRouter);
app.use('/authors',authorsRouter);
app.use('/login',loginRouter);
app.use('/admin',adminRouter);




app.get('/',function(req,res)
{
    Bookdata.find().then(function(books){
        Authordata.find().then(function(authors){res.render("index",{obj,books,authors});})
    })
    
})




// booksrouter


// authorsrouter

// loginrouter


// adminrouter


app.listen(port,()=>{console.log("server ready at"+port)});