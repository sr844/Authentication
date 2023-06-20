const homecontroller = require('../routes/auth.js');

const User = require('../models/user')

//Install bcrypt for hashing the password
  const bcrypt = require('bcrypt');
const { findByIdAndUpdate } = require('../models/user');

module.exports.update = async function(req,res){
    try {
       const user = await User.findOne({
        username:req.body.username
       })
      if(!user){
        return res.status(400).json("user is not found");
      }
      const pass = await bcrypt.compare(req.body.password , user.password);
      if(!pass){
        return res.status(400).json('Incorrect password');
      }
      const newpassword = req.body.newpassword;
      const salt = await bcrypt.genSalt(15);
    const hashpass = await bcrypt.hash(newpassword,salt);
      const updateuser = await User.findByIdAndUpdate(user._id,{
        password : hashpass
      })
     return res.status(200).json({
      message:"Password updated succesfully",
      updateuser
     })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}


module.exports.delete = async function(req,res){
     try {
      const user = await User.findOne({
        username:req.body.username
      })
      if(!user){
        return res.status(400).json('User is not found');
      }
      const pass = await bcrypt.compare(req.body.password,user.password);
        if(!pass){
          return res.status(400).json('Incorrect password')
        }
        const del = await User.findByIdAndDelete(user._id,{
             id:user._id
        })
        return res.status(200).json("Deleted successfully");
     } catch (error) {
      console.log('error',error);
      res.status(500).json(error)
     }
}