const express=require("express");
const app=express();

//importing routes
const menuRoutes=require("./routes/menuRoutes");
const personRoutes=require("./routes/personRoutes");

const passport=require("./auth");
require("dotenv").config();

const mongoose=require("mongoose");

//converting input data into json data
app.use(express.json());

app.use(passport.initialize());


//mongodb connection
const mongoURL=process.env.DB_URL;
const mongoURLlocal=process.env.DB_URL_LOCAL;
//const mongoURLlocal='mongodb://127.0.0.1:27017/hotel'
mongoose.connect(mongoURLlocal);


//middleware function

const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] request made to : ${req.originalUrl}`);
    next();
}

app.use(logRequest);


const localAuthMiddleware=passport.authenticate('local',{session:false});

//get from root page
app.get('/', function (req,res){
    console.log("homepage opened");
    res.send("Welcome to Home Page");
})


app.use("/",personRoutes);
app.use("/",menuRoutes);

const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server running at port ${port}`);
})


