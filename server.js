const express=require("express");
const app=express();
require("dotenv").config();

const mongoose=require("mongoose");

//converting input data into json data
app.use(express.json());

//mongodb connection
const mongoURL=process.env.DB_URL;
const mongoURLlocal=process.env.DB_URL_LOCAL;
//const mongoURLlocal='mongodb://127.0.0.1:27017/hotel'
mongoose.connect(mongoURL);

//get from root page
app.get('/',(req,res)=>{
    console.log("homepage opened");
    res.send("Welcome to Home Page");
})

//importing routes
const personRoutes=require("./routes/personRoutes");
app.use('/',personRoutes);

const menuRoutes=require("./routes/menuRoutes")
app.use("/",menuRoutes);

const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server running at port ${port}`);
})


