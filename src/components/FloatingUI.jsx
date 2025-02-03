import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function FloatingUI(props){

    const {setSearchFilter,setShowFavs,showFavs}=props.data
    const navigate=useNavigate();
    const userName=localStorage.getItem("userName");
    const [logout,setLogout]=useState("hidden");


    return(<>
        <div className="text-4xl font-bold text-yellow-300 header fixed top-[20px] left-[21px] z-20">KEEP NOTES</div>
        <div className="text-4xl font-bold text-purple-500 header fixed top-[18px] left-[18px] z-20">KEEP NOTES</div>

        <div className="static w-[100vw] h-[75px] shadow-2xl top-0 z-10 flex justify-end items-center p-10 gap-5"> 
          <input
           className="border-2 border-black rounded-xl p-2"
           type="text" 
           placeholder="Search" 
           onChange={(e)=>{setSearchFilter(e.target.value)}} />
          <img onClick={()=>{setShowFavs(!showFavs)}} src={showFavs?"Fav.png":"notFav.png"} className="bg-black rounded-[50%] w-[50px] h-[50px] cursor-pointer shadow-2xl shadow-black duration-300 hover:translate-y-[-3px]" title="Favourites" alt="" /> 
          </div>

        
        <div className={`${logout} z-10`}>
            <div 
            className="cursor-pointer text-3xl text-purple-400 font-bold text-center fixed bottom-[120px] right-[35px] ">{userName}</div>
            </div>

            <img src="user.png"
              onClick={()=>{
                logout=="hidden"? setLogout("block"):setLogout("hidden");
              }}
              alt=""
              className="z-10 cursor-pointer animate-pulse fixed bottom-[30px] right-[20px] rounded-[50%]"/>
            <div className={`${logout} z-10`}>
            <div 

            onClick={()=>{
                localStorage.clear();
                navigate("/login");
            }}
            className="cursor-pointer px-[10px] text-2xl text-red-500 text-center fixed bottom-[10px] right-[30px] ">Logout</div>
            </div>
    
    </>)
}