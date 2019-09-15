var mongoose=require("mongoose")
var schema=mongoose.Schema
var authorschema=new schema({
    btitle:{type:String},
    genre:{type:String},
    author:{type:String},
    image:{type:String}
})
var authormodel=mongoose.model("authors",authorschema,"lib1")
module.exports=authormodel