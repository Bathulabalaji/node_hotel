//schema for Person
const mongoose=require("mongoose");

const bcrypt=require('bcrypt');



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
    salary:Number,
    username:String,
    password:String
});


personSchema.pre('save',async function(next) {

    const person=this;
    //Hash the password if it  is new or modified only
    if(!person.isModified('password')) return next();
    try{
        //hash password generation
        const salt=await bcrypt.genSalt(10);
        console.log(bcrypt.genSalt(10))

        //hash password
        const hashedPassword=await bcrypt.hash(person.password,salt);

        //override the plain password with the hashed one
        person.password=hashedPassword;
        next();
    }catch(err){
        return next(err);

    }
})


personSchema.methods.comparePassword=async function(candidatePassword) {
    try{
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}
//person model
const personModel=mongoose.model("Person",personSchema);
module.exports=personModel;