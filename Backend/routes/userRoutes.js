import { login, registerUser } from "../controllers/usercontroller.js";


export function userRoutes(app){

    app.post("/register",registerUser);
    
    app.post("/login",login);

}