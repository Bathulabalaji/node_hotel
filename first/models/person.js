//schema for Person
const mongoose=require("mongoose");

const personSchema=new mongoose.Schema({
    name:String,
    id:Number,
    email:String,
    mobile:Number,
    age:Number,
    address:String,
    work:{
        type:String,
        enum:["chef","manager","waiter"],
        required:true
    },
    salary:Number
});

//person Model

const personModel=mongoose.model("Person",personSchema);
module.exports=personModel;