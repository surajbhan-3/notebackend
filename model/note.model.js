const mongoose=require("mongoose")


const notesSchema=mongoose.Schema({
        title:String,
        body:String,
        userID:String

})


const NotesModel= mongoose.model("usernotes",notesSchema)

module.exports={NotesModel}