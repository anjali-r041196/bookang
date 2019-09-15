var mongoose=require("mongoose")
var schema=mongoose.Schema
var userschema=new schema({
    fname:{type:String,required:true},
    lname:{type:String,required:true},
    email:{type:String,required:true},
    pass:{type:String},
    
})
var usermodel=mongoose.model("user",userschema,"user")
module.exports=usermodel