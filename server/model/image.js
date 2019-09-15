var mongoose=require("mongoose")
var schema=mongoose.Schema
var imageschema=new schema({
    
    image:{type:String}
})
var imagemodel=mongoose.model("image",imageschema,"lib2")
module.exports=imagemodel