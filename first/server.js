const express=require("express");
const app=express();
const mongoose=require("mongoose");

// Use express.json() to parse incoming JSON data
app.use(express.json())
const mongoUrl= 'mongodb://127.0.0.1:27017/hotelshub'


//mongodb connection
mongoose.connect(mongoUrl);

//Schema

const sch={
    name:String,
    id:Number,
    email:String
}

const monmodel=mongoose.model("NewCol",sch);


const itemsSchema={
    name:String,
    price:Number
}

const itemsModel=mongoose.model("Item",itemsSchema);
//POST

app.post("/updateProfile",async(req,res)=>{
    console.log("inside post update profile method");

    const data=new monmodel({
        name:req.body.name,
        id:req.body.id,
        email:req.body.email
    });
    console.log(data);
    const val=await data.save();
    res.json(val);
})
app.get('/',(req,res)=>{
    console.log("homepage opened");
    res.send("Welcome to Home Page");
})
app.get('/profile',async (req,res)=>{
    console.log("new profile data");
    const data= await monmodel.find();
    res.send(data);
})
app.post('/items',async(req,res)=>{
    console.log("Inside Items posting");

    const data=new itemsModel({
        name:req.body.name,
        price:req.body.price
    });
    const val=await data.save();
     res.status(200).json(val);
 })

app.listen(3000,()=>{
    console.log("Port 3000 running");
})
