import notesData from "../models/dataModel.js";

export async function addNote(req,res){

    const {email,data}=req.body;

    try{
        const note = new notesData({
            email , data
        });

        const x= note.save();

        res.status(201).json("Note added");
    }
    catch(err){
        res.status(500).send(err)
    }
}

export async function getNotes(req,res){

    const id=req.params.id;

    try{
        
        const xyz= await notesData.find({"email":id})

        res.status(201).json({data:xyz});
    }
    catch(err){
        res.status(500).send(err)
    }
}

export async function deleteNote(req,res){

    const {id}=req.body
    try{
        
        const xyz= await notesData.deleteOne({_id:id})

        res.status(200).json({data:xyz,message:"success"});
    }
    catch(err){
        res.status(500).send(err)
    }
}

export async function editNote(req,res){

    const {id,email,data}=req.body
    try{
        
        const xyz= await notesData.updateOne({_id:id},{data:data});

        res.status(200).json("success");
    }
    catch(err){
        res.status(500).send(err)
    }
}