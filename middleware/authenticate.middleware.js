const jwt= require("jsonwebtoken")


const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
              //  console.log(decoded)
                req.body.userID=decoded.userID
                
              // console.log(req.body)
                next()
            }else{
                res.send("please login")
            }
        })
    }else{
        res.send("please Login")

    }



}


module.exports={authenticate}