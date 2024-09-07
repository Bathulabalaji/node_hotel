const express=require("express");
const router=express.Router();

const personModel=require("../models/person");

const {jwtAuthMiddleware,generateToken}=require("../jwt");


router.post('/person/signup',jwtAuthMiddleware,async(req,res)=>{
    const data=new personModel({
        name:req.body.name,
        id:req.body.id,
        email:req.body.email,
        mobile:req.body.mobile,
        age:req.body.age,
        address:req.body.address,
        work:req.body.work,
        salary:req.body.salary,
        username:req.body.username,
        password:req.body.password
    });

    console.log(data);
    const response=await data.save();
    console.log("data saved");

    const payload={
        id: response._id,
        username:response.username
    }
    console.log("payload:",JSON.stringify(payload));
    const token=generateToken(payload);
    console.log("token is :",token);


    res.status(200).json({response:response,token:token});
})


//login

router.post('/person/login',jwtAuthMiddleware,async(req,res)=>{
    try{
        //extract username and password from req.body
        const {username,password}=req.body;
        //find the user by username
        const user=await personModel.findOne({username:username});

        //if the user does not exist or password does not match, return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:"Invalid username or password"});
        }
        //generate token
        const payload={
            id: user._id,
            username: user.username
        }
        const token=generateToken(payload);

        //return token as response 
        console.log("jwt token login:",token);
        res.json({"token":token});
    }catch(err){
        console.log({err:"error"});
        res.status(500).json({err:"Internal server error"});
    }
})



//profile

router.get('/person/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
        const userData=req.user;
        console.log("user data:",userData);

        const userId=userData.id;
        const user=await personModel.findById(userId);
        console.log("user details:",user);
        res.status(200).json({"user details":user});
    }catch(err){
        console.log(err);
        res.status(200).json({err:"Internal server error"});
    }

})
router.get('/person',async(req,res)=>{
    const data=await personModel.find();
    res.send(data);
})

router.get('/person/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType;
        if(workType=='chef' || workType=='manager' || workType=='waiter'){
            const data=await personModel.find({work:workType});
            console.log(data);
            res.send(data);
        }
        else{
            res.status(404).json({err:"Invalid work type"});
        }
    }catch(err){
        console.log(err);
        res.status(200).json({err:"Internal server error"});
    }
})

router.put('/person/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const updatedPersonData=req.body;

        const data=await personModel.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidators:true
        });
        if(!data){
            return res.status(404).json({err:"Invalid person Id"});
        }
        console.log("Data updated!!");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({err:"Internal server error!!"});
    }

})

router.delete('/person/:id',async(req,res)=>{
    try{
        const personId=req.params.id;

        const data=await personModel.findByIdAndDelete(personId);
        if(!data){
            return res.status(404).json({err:"Invalid person Id"});
        }
        console.log(data,"Data Deleted!!");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({err:"Internal server error!!"});
    }
})
module.exports=router;