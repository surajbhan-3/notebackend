
const express= require("express")
const {connection}=require("./config/db")
const {userRouter}=require("./route/Users.routes")
const {noteRouter}=require("./route/notes.routes")
require("dotenv").config()
const {authenticate}=require("./middleware/authenticate.middleware")
const cors=require("cors")




const app =express()

app.use(express.json())
app.use(cors())


app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)


//commgit 



app.listen(process.env.port,async(req,res)=>{


    try {
        await connection
        console.log("Mongodb is connected")
    } catch (error) {
        console.log(error.message)
    }

     console.log("server is running at port")
})