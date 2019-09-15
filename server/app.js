var express=require("express");
var bodyparser=require('body-parser')
 path =require('path')
 cors=require('cors')
 multer = require('multer')
 const PATH ='./uploads'

 let storage=multer.diskStorage({
     destination:(req,file,cb)=>{
         cb(null,PATH)
     },
     filename:(req,file,cb)=>{
        cb(null,file.originalname)
    },
 })
 let upload=multer({
     storage:storage
 })
var auth=require("./model/user")
var book=require("./model/authors")
//var bk=require("./model/image")
const app=express()
var url="mongodb+srv://anjalir:anjali@cluster0-vp9od.mongodb.net/p?retryWrites=true&w=majority/p"
var mongoose=require("mongoose")
app.use(cors())

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(function (req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
res.setHeader('Access-Control-Allow-Credentials', true);
next();

});
app.get('/api',function(req,res){
    res.end('File catcher')
})
mongoose.connect(url,function(err){
    if(err) throw err
    else{
        console.log("database connected")
    }
})
app.post("/signup",function(req,res){
   console.log(req.body)
    
    var u=new auth();
    u.fname=req.body.fname;
    u.lname=req.body.lname;
    u.email=req.body.email;
    u.pass=req.body.pass;
  u.save(function(err){
   
})
})
app.post("/upload",function(req,res){
  var u=new book()
      u.btitle=req.body.a;
      u.genre=req.body.b;
      u.author=req.body.c;
      u.image=req.body.d;
   u.save(function(err){
    
 })
   
})
app.post("/up",function(req,res){
  console.log(req.body.d)
 book.updateOne({btitle:req.body.a} ,{$set:{
      btitle:req.body.a,
      genre : req.body.b,
       author : req.body.c,
       image : req.body.d
   }},(err,result)=>{
    book.find({},(err,result)=>{
       
         console.log(result)
       
        })
     })
    })
app.get("/show",function(req,res){
   
    book.find({},(err,result)=>{
        
       res.send(result)
        
    })
})
app.post("/del",function(req,res){
  book.find({btitle:req.body.a,genre:req.body.b,author:req.body.c,image:req.body.d},(err,result)=>{
    console.log(result.image)
    book.deleteOne({btitle:req.body.a,genre:req.body.b,author:req.body.c,image:req.body.d},(err,result)=>{
    res.send("deleted")
    })  
 })
})
app.get("/show/view/:id",function(req,res){
   res.sendFile(__dirname+"/uploads/"+req.params.id)
 })

app.get("/login",function(req,res){
    auth.find({},function(err,result){
        res.send(result)
        })
})

app.post('/api/upload',upload.single('image'),  function (req, res) {
    if (!req.file) {
      console.log("No file is available!");
      return res.send({
       success: false
      });
     } 
    else {
      console.log('File is available!');
         return res.send({
        success: true
      })
    }
  });
  
  // Create PORT
  const PORT = process.env.PORT || 8080;
  const server = app.listen(PORT, () => {
    console.log('Connected to port ' + PORT)
  })
  
  // Find 404 and hand over to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });
  
  // error handler
  app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
  });