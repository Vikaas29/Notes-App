import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export function Login(){
    const notify = (message) => toast(message);

    const navigate=useNavigate();

    const [email,setEmail]=useState();
    
    const [password,setPassword]=useState();

    
    async function login(e){
        e.preventDefault();

        if(!email.includes("@") || !email.includes(".com")){
            notify("enter email correctly");
            return;
        }

        if(!email || !password){
            notify("all fields are necessary");
            return;
        }

        const saveUser=await fetch("https://notes-app-sand-six.vercel.app/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email:email,
                password:password
            })
        });

        const message=await saveUser.json();
        
        if(message.User){
            localStorage.setItem("userName",message.User.userName);
            localStorage.setItem("email",message.User.email);
            localStorage.setItem("jwt",message.token);
        }
        notify(message.message);


        if(message.message=="Login Successfull")
        {
            setTimeout(()=>{
            navigate("/");
        },1000);
    }

    }

    return (<>

    <div  className="w-[100%] text-2xl pl-5 backdrop-blur-md "><img onClick={()=>{navigate("/")}} src="/images/home.png" className="w-[60px] cursor-pointer" alt="" /></div>
    
    <div className="w-[100%] h-[80vh] flex flex-col justify-center items-center gap-10">
    <div className="text-green-600 text-5xl ">Login</div>
        <form action="" className="bg-gray-400 border-[5px] border-white rounded-xl w-[50%] p-[5%] flex flex-col gap-10 justify-center items-center backdrop-blur-md hover:border-red-600">
            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" className="bg-white w-[70%] text-xl p-[5px] rounded-lg text-black" />
            
            <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" className="bg-white w-[70%] text-xl p-[5px] rounded-lg text-black"/>

            <button type="submit" onClick={(e)=>{login(e)}} className="border border-red-600 bg-red-600 font-bold w-[70%] text-xl p-[5px] rounded-lg duration-300 hover:text-black hover:scale-110">Submit</button>
            <div>
             Don't have a account? <span className="text-red-600 font-bold cursor-pointer" onClick={()=>{navigate("/register")}}>Register here</span>
            </div>
        </form>

        
    </div>
    </>)
}

export default Login;