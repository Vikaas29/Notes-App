import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
    "email":{type:String,required:true,},
    "data":{type:Object,required:true},
});

const notesData =mongoose.model("NotesAppData",dataSchema);

export default notesData;