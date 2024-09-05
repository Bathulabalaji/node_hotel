const express=require("express");
const router=express.Router();

const personModel=require("../models/person");



router.post('/person',async(req,res)=>{
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
    const val=await data.save();
    res.status(200).json(val);
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