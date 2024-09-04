const express=require("express");
const router=express.Router();

const menuModel=require("../models/menu");

router.post('/menu',async(req,res)=>{
    const data=new menuModel({
        name:req.body.name,
        price:req.body.price,
        taste:req.body.taste,
        isDrink:req.body.isDrink,
        sales:req.body.sales
    });
    const val=await data.save();
    res.status(200).json(val);
})

router.get('/menu',async(req,res)=>{
    const data=await menuModel.find();
    res.send(data);
})

router.get('/menu/:tasteType',async(req,res)=>{
    try{
        const tasteType=req.params.tasteType;
        if(tasteType=='sweet' || tasteType=='sour' || tasteType=='spicy'){
            const data=await menuModel.find({taste:tasteType});
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

router.put('/menu/:id',async(req,res)=>{
    try{
        const menuId=req.params.id;
        const updatedMenuData=req.body;

        const data=await menuModel.findByIdAndUpdate(menuId,updatedMenuData,{
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


router.delete('/menu/:id',async(req,res)=>{
    try{
        const menuId=req.params.id;

        const data=await menuModel.findByIdAndDelete(menuId);
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