const express=require("express");
const app=express();

const mongoose=require("mongoose");

//converting input data into json data
app.use(express.json());

//mongodb connection
const mongoURL='mongodb+srv://bathulabalaji:Balaji.123@cluster0.er28u.mongodb.net/'
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

app.listen(4000,()=>{
    console.log("port 4000 running");
})


