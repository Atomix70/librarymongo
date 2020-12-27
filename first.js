const Bookdata=require ("./src/model/Bookdata")
const Authordata=require ("./src/model/Authordata")


const fs = require('fs')
let rawdata1 = fs.readFileSync('books.json');
let books = JSON.parse(rawdata1);
// console.log(books);
// console.log(books.length)
let rawdata2 = fs.readFileSync('authors.json');
let authors = JSON.parse(rawdata2);
// console.log(authors)
// console.log(authors[2].author.replace(/ /g,''))
// for(i=0;i<books.length;i++){
// authors.push(books[i].author)
// }
// let uniqueauthors = [...new Set(authors)];
// console.log(uniqueauthors)
// console.log(uniqueauthors.length)
// console.log(authors);

for(i=0;i<books.length;i++){
    var book={
        Image:books[i].imageLink,
        Title:books[i].title,
        Author:books[i].author,
        Country:books[i].country,
        Language:books[i].language,
        Pages:books[i].pages,
        Year:books[i].year,
        Link:books[i].link
        }
        var buk=Bookdata(book);
        buk.save();
}
for(i=0;i<authors.length;i++){
    var book={
        Image:"images/"+authors[i].author.replace(/ /g,'')+".jpg",
        // Title:uniqueauthors[i].title,
        Name:authors[i].author,
        Description:authors[i].description
        }
        var aut=Authordata(book);
        aut.save();
}


