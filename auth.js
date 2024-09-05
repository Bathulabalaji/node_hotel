// const passport=require('passport');
// const LocalStrategy=require('passport-local').Strategy;

// const personModel = require("./models/person");
// const bcrypt = require("bcrypt");

// passport.use(new LocalStrategy(async (USERNAME,password,done)=>{
//     try{
//         console.log("Received Credentials:",USERNAME,password);
//         const user=await personModel.findOne({username:USERNAME});
//         console.log(user);
//         if(!user){
//             console.log("Invalid user");
//             return done(null,false,{message:"Inavalid user"});
//         }
//         const isPasswordMatch=user.comparePassword(password);
//         if(isPasswordMatch){
//             console.log("password matched");
//             return done(null,user);
//         }
//         else{
//             console.log("password not matched");
//             return done(null,false,{message:"Invalid Password"});
//         }

//     }catch(err){
//         console.log("catch error");
//         return done(err);
//     }
// }));

// module.exports=passport;


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const personModel = require("./models/person");
const bcrypt = require("bcrypt");

// Configure local strategy for passport
passport.use(new LocalStrategy({
    usernameField: 'username', // Use specific field names if they differ from defaults
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        console.log("Received Credentials:", username, password);
        const user = await personModel.findOne({ username: username });
        console.log('User found:', user);

        if (!user) {
            console.log("Invalid user");
            return done(null, false, { message: "Invalid user" });
        }

        const isPasswordMatch = await user.comparePassword(password); // Awaiting the asynchronous comparison
        if (isPasswordMatch) {
            console.log("Password matched");
            return done(null, user);
        } else {
            console.log("Password not matched");
            return done(null, false, { message: "Invalid Password" });
        }
    } catch (err) {
        console.log("Catch error in passport strategy:", err);
        return done(err);
    }
}));

module.exports = passport;
