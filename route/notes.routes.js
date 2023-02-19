
const express = require("express");
const { NotesModel } = require("../model/note.model");

//app.use(express.json())
const noteRouter = express.Router();


noteRouter.get("/",async(req,res)=>{
  
    try {
        console.log(req.body)
        const allnotes= await NotesModel.find({userID:req.body.userID})
         res.send(allnotes)
    } catch (error) {
        res.send(error)
        
    }


})


noteRouter.post("/create",async(req,res)=>{
      const payload=req.body
     const createNotes= new NotesModel(payload)
     await createNotes.save()
     res.send(createNotes)


})

noteRouter.delete("/delete/:id",async(req,res)=>{
  const payload=req.body
  //console.log(payload)
 
  const id=req.params.id
  //console.log(id)
  const note= await NotesModel.findOne({"_id":id})

  const userID_in_note=note.userID
  const userid_making_req=req.body.userID
    try {
      if(userid_making_req!==userID_in_note){
        res.send("You are not authorised")
      }else{
          await NotesModel.findByIdAndDelete({"_id":id})
      res.send("deleted")
      }
        
    } catch (error) {
        res.send(error)
    }



})

noteRouter.patch("/update/:id",async(req,res)=>{
      const payload=req.body
      console.log(payload)
     
      const id=req.params.id
  //    console.log(id)
      const note= await NotesModel.findOne({"_id":id})
  
      const userID_in_note=note.userID
      const userid_making_req=req.body.userID
      try {
            if(userid_making_req!==userID_in_note){
              res.send("You are not authorised")
            }else{
                await NotesModel.findByIdAndUpdate({"_id":id},payload)
            res.send("updated")
            }
        
      } catch (error) {
        res.send(error)

      }
})


module.exports={noteRouter}