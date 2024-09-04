

//schema for Menu
const mongoose=require("mongoose");
const menuSchema=new mongoose.Schema({
    name:String,
    price:Number,
    taste:{
        type:String,
        enum:['sweet','sour','spicy'],
        required:true
    },
    isDrink:Boolean,
    sales:Number
});

//menu model
const menuModel=mongoose.model("Item",menuSchema);
module.exports=menuModel;