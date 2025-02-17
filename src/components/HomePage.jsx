import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FloatingUI } from "./FloatingUI";
import { NoteBox } from "./NoteBox";
import { AddNode } from "./AddNote";
import { CurrentNote } from "./CurrentNote";
import { ToastContainer, toast } from 'react-toastify';
import { Commet, OrbitProgress } from "react-loading-indicators";

export function HomePage(){

    const navigate=useNavigate();
    const userName=localStorage.getItem("userName");
    const email=localStorage.getItem("email");
    const JWT=localStorage.getItem("jwt");
    const [ showAddNote,setShowAddNote]=useState(false);
    const [notesData,setNotesdata]=useState([]);
    const [loader,setLoader]=useState(true);
    const [showNote,setShowNote]=useState(false);
    const [currentNote,setCurrentNote]=useState({});
    const[isEditing,setIsEditing]=useState(false);
    const[editData,setEditData]=useState({});
    const [searchFilter,setSearchFilter]=useState("");
    const [showFavs,setShowFavs]=useState(false);
    const [sort,setSort]=useState(false);

    const notify = (message) => toast(message);

    useEffect(() => {
      
        if(!userName){
            navigate("/login")
            return
        }

        fetchNotes();

        
    }, [showNote,showAddNote,sort]);
    
    async function fetchNotes() {
            
        const response=await fetch(`https://notes-app-sand-six.vercel.app/getnotes/${email}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "authorization": `JWT ${JWT}`
            }
        });

        const result= await response.json();
        let arrayData=[...result.data];
        if(sort==true){arrayData.sort((a,b)=>a.data.date-b.data.date)}
        else{arrayData.sort((a,b)=>b.data.date-a.data.date)}
        setNotesdata([...arrayData]);
        setLoader(false);
    }


    return(<>
        <ToastContainer />
        <FloatingUI data={{setSearchFilter,setShowFavs,showFavs,setSort,sort}} ></FloatingUI>

        <div className="p-10 flex flex-wrap gap-5">
            {
                loader && <div className=" w-[100%] h-[70vh] flex justify-center items-center">
                    <OrbitProgress variant="dotted" color="#32cd32" size="medium" text="" textColor="" />
                    </div>
            }
           {notesData && showFavs ? notesData.filter(e=>e.data.fav==true).filter((e)=>e.data.title.includes(searchFilter)||e.data.content.includes(searchFilter)).map((e,index)=><NoteBox key={index} data={{e ,setShowNote,setCurrentNote}}></NoteBox>) :
            notesData.filter((e)=>e.data.title.includes(searchFilter)||e.data.content.includes(searchFilter)).map((e,index)=><NoteBox key={index} data={{e ,setShowNote,setCurrentNote}}></NoteBox>)}
        </div>


        <div>
            <img onClick={()=>{setShowAddNote(true)}} src="add.png" className="fixed bottom-10 left-10 cursor-pointer rounded-[50%] duration-300 hover:scale-125 z-10" alt="" />
        </div>


        {showAddNote ? <div className="w-[100%] h-[100%] bg-[#0a0a0ada] fixed top-0 left-0 z-50 flex justify-center items-center">
            <div 
                onClick={()=>{
                    setShowAddNote(false);
                    setIsEditing(false);
                }}
                className=" text-yellow-400 text-4xl fixed top-5 right-5 duration-150 hover:scale-125 hover:text-red-600 cursor-pointer">close</div>
            <AddNode data={{setShowAddNote,setEditData,setIsEditing,isEditing,editData,notify}}></AddNode>
        </div>: null}

        {showNote ? <div className="w-[100%] h-[100%] bg-[#0a0a0ada] fixed top-0 left-0 z-50 flex justify-center items-center" >
            
            
            <CurrentNote data={{currentNote,setShowNote,setEditData,setIsEditing,setShowAddNote,notify}}></CurrentNote>
        </div>: null}

    </>)
}

export default HomePage;