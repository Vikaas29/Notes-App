import { addNote, deleteNote, editNote, getNotes } from "../controllers/dataController.js";
import { checkLogin } from "../middlewares/checkLogin.js";

export function dataRoutes(app){

    app.post("/addnote",checkLogin,addNote);

    app.get("/getnotes/:id",checkLogin,getNotes)

    app.delete("/deletenote",checkLogin,deleteNote);

    app.put("/editnote",checkLogin,editNote)
}