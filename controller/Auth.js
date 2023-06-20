const homecontroller = require('../routes/auth.js');

const User = require('../models/user')

//Install bcrypt for hashing the password
  const bcrypt = require('bcrypt');


module.exports.register = async function(req,res){
   try {
      const salt = await bcrypt.genSalt(15);
    const hashpass = await bcrypt.hash(req.body.password,salt);
    const new_user = new User({
       username:req.body.username,
       email:req.body.email,
       password:hashpass
    }) 
    const user = await new_user.save();
    console.log(user);
   return res.status(200).json(user);
 
       } catch (error) {
            console.log('error:',error);
         
           res.status(500).json(error);
       }
}

module.exports.login = async function(req,res){
   try {
   const user = await User.findOne({
      username:req.body.username
   })
   if(!user){
    return  res.status(400).json("User is not found")
   } 

   const validated = await bcrypt.compare(req.body.password,user.password);
       if(!validated) {
        return  res.status(400).json("Incorrect password")
       } 

   const{ password, ...others}= user._doc;
     return res.status(200).json(others);
   } catch (error) {
      console.log('err:',error);
      return res.status(500).json(error)
   }
}

