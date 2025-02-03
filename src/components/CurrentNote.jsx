import { useState } from "react";

export function CurrentNote(props){


    
    const {title,content,images}=props.data.currentNote.data
    const {setShowNote,setIsEditing,setEditData,setShowAddNote,notify}=props.data
    const id=props.data.currentNote._id;
    const [fullScreen,setFullScreen]=useState(false);
    const JWT=localStorage.getItem("jwt");

    async function handleDelete() {

        try{

            const response= await fetch("https://notes-app-sand-six.vercel.app/deletenote",{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                    "authorization": `JWT ${JWT}`
                },
                body: JSON.stringify({
                    id
                })
            });

            const result= await response.json();
            
            if(result.message=="success"){
                setShowNote(false);
                notify("Note Deleted");
            }
        }
        catch(err){

            console.log(err);
        }
        
    }

    async function handleEdit() {
        setIsEditing(true);
        setEditData(props.data.currentNote);
        setShowNote(false);
        setShowAddNote(true);
    }

    function handleFullScreen(){

        const targetDiv=document.getElementById("fullScreenDiv");
        if(document.fullscreenElement){
            document.exitFullscreen();
        }
        else{
            targetDiv.requestFullscreen();
        }
        setFullScreen(!fullScreen);
    }

    return (<div className="flex flex-col items-end" >

    

    <div className="flex gap-6 mr-10">

        <div className="w-[400px] flex justify-start items-start">

            <div onClick={()=>{
                setFullScreen(!fullScreen);
                handleFullScreen();
            }} className="text-blue-600 text-3xl cursor-pointer duration-150 hover:scale-125">
                {!fullScreen?"Go FullScreen":"Exit FullScreen"}
            </div>

        </div>

        <div 
        onClick={()=>{handleEdit() }}
        className="text-green-600 text-3xl cursor-pointer duration-150 hover:scale-125">edit</div>


        <div
            onClick={()=>{handleDelete()}}
            className="text-red-600 text-3xl cursor-pointer duration-150 hover:scale-125">delete</div>

        <div 
            onClick={()=>{
                setShowNote(false);
                setCurrentNote({});
            }}
            className=" text-yellow-400 text-3xl hover:text-red-600 cursor-pointer duration-150 hover:scale-125">close</div>

    </div>
    
    <div 
    id="fullScreenDiv"
    onClick={()=>{
        if(fullScreen==true){handleFullScreen()}
    }}
    className="flex flex-col w-[800px] h-[800px] border-2 border-black bg-white rounded-4xl gap-4 p-10">
        
        
        <div className="w-[100%] truncate text-6xl text-center">{title}</div>
        <div className="border border-black w-[100%]"></div>
        <div 
        
        className="w-[100%] h-[70%] text-wrap overflow-auto"
        ><p onClick={() => {navigator.clipboard.writeText(content);notify("Text copied to Clipboard")}}
        title="click to copy"
        className="cursor-pointer">{content}</p></div>
        <div className="border border-black w-[100%]"></div>

        <div className="w-[100%] h-[15%] flex overflow-auto gap-4 ">
            {images.map((e,index)=><img key={index} src={e} onClick={()=>{window.open(e)}}  title="click to open" className="w-[80px] h-[80px] cursor-pointer " />)}
        </div>

    </div>

    
    
    </div>)
}