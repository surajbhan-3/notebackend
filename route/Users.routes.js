const express = require("express");
const { UserModel } = require("../model/Users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = express.Router();



userRouter.post("/register", async (req, res) => {
    
  const { name, email, pass } = req.body;

  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
        
         if(err){
            res.send({"msg":"some thing is wrong",err:err.message})
         }else{
            const user = new UserModel({name,email,pass:hash});
            await user.save()
            res.send({ msg: "user is registered" })
         }
 
      
    });
  } catch (error) {
    res.send({ msg: "somthing wrong", error: error.message });
  }
});




userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (result) {
          let token = jwt.sign({ userID:user[0]._id }, "masai");
          res.send({ msg: "user is Loggedin", token: token });
        } else {
          res.send("wrongCredeinals");
        }
      });
    } else {
      res.send({ msg: "wrong credentials" });
    }
  } catch (error) {
    res.send({ msg: "somthing wrong", error: error.message });
  }
});

module.exports = { userRouter };
