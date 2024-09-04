const express=require("express");
const app=express();

const mongoose=require("mongoose");

//converting input data into json data
app.use(express.json());

//mongodb connection

mongoose.connect('mongodb://127.0.0.1:27017/hotel');




app.get('/',(req,res)=>{
    console.log("homepage opened");
    res.send("Welcome to Home Page");
})












const personRoutes=require("./routes/personRoutes");
app.use('/',personRoutes);

const menuRoutes=require("./routes/menuRoutes")
app.use("/",menuRoutes);

app.listen(4000,()=>{
    console.log("port 4000 running");
})


