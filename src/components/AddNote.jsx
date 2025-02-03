import { useEffect, useState } from "react";
import { VoiceMemo } from "./VoiceMemo";
export function AddNode(props){

    
    const {setShowAddNote,setEditData,setIsEditing,isEditing,editData,notify}=props.data;

    const email=localStorage.getItem("email");
    const JWT=localStorage.getItem("jwt");
    const [title,setTitle]=useState("");
    const [textArea,setTextArea]=useState("");
    const[uploading,setUploading]=useState(false);
    const [file,setFile]=useState(null);
    const [images,setImages]=useState([]);
    const [isSubmit,setIsSubmit]=useState(false);
    const [fav,setFav]=useState(false);
    

    
    useEffect(()=>{
        if(isEditing==true){
            setTitle(editData.data.title);
            setTextArea(editData.data.content);
            setImages([...editData.data.images])
        }
        else{setTitle("");
            setTextArea("");
            setImages([])}
    },[])
    

    useEffect(()=>{
        async function handleImageUplaod() {

            try{
            if(!file){return;}
            setUploading(true)
            const imageData=new FormData();
            imageData.append("file",file);
            imageData.append("upload_preset","Email_Builder_Preset");
            imageData.append("cloud_name","djllmrckt");
    
            const res=await fetch("https://api.cloudinary.com/v1_1/djllmrckt/image/upload",{
                method:"POST",
                body:imageData
            });
            const imageUrlData= await res.json();
    
            setImages([...images,imageUrlData.url]);
            notify("Image Uploaded");
    
            setFile(null);
            }
            catch(err){
                alert(err);
            }
            finally{setUploading(false)} 
        }
        handleImageUplaod();
    },[file])

    

    async function handleSubmit(){

        const contentArea=document.getElementById("contentArea").value
        if(title=="" && contentArea==""){notify("One Field is MANDATORY");return}
        setIsSubmit(true);

        try{
            const data={
                title:title==""? `${new Date()}`:title,
                content:contentArea,
                images:images,
                fav:fav,
                date:Date.now()
            }

    
            const response = await fetch("https://notes-app-sand-six.vercel.app/addnote",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "authorization": `JWT ${JWT}`
                },
                body: JSON.stringify({
                    email,
                    data
                })
            })

            const result= await response.json();

            if(result=="Note added"){
                setTitle("");
                setTextArea("");
                setImages([]);
                
                setShowAddNote(false);
                notify("Note Saved");
            }
        }
        catch(err){
            console.log(err)
        }
        finally{
            setIsSubmit(false);
        }

    }

    async function handleEdit(){
        const contentArea=document.getElementById("contentArea").value
        if(title=="" && contentArea==""){notify("One Field is MANDATORY");return}
        setIsSubmit(true);
        
        try{
            const data={
                title:title==""? `${new Date()}`:title,
                content:contentArea,
                images:images,
                fav:fav,
                date:Date.now()
            }

            const id= editData._id;
            
    
            const response = await fetch("https://notes-app-sand-six.vercel.app/editnote",{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    "authorization": `JWT ${JWT}`
                },
                body: JSON.stringify({
                    id,
                    email,
                    data
                })
            })

            const result= await response.json();

            if(result=="success"){
                setTitle("");
                setTextArea("");
                setImages([]);
                
                setEditData({});
                setIsEditing(false);
                setShowAddNote(false);
                notify("Changes Saved");
            }

            
        }
        catch(err){
            console.log(err)
        }
        finally{
            setIsSubmit(false);
        }

    }




    return (<>
    
    <div className="flex flex-col w-[800px] h-[800px] border-2 border-black bg-white rounded-4xl gap-4 p-10">


        <input type="text"
         onChange={(e)=>{setTitle(e.target.value)}}
         placeholder="Enter the title"
         value={title}
          className="w-[100%] h-[40px] p-2 text-2xl border-2 border-black rounded-xl" />

        <div className="border border-black w-[100%]"></div>

        <VoiceMemo data={{textArea,setTextArea}}></VoiceMemo>

        <div className="border border-black w-[100%]"></div>

        <div>
            <div className="text-2xl mb-2">Add Images :
                <input 
                type="file"
                disabled={uploading}
                onChange={(e)=>{setFile(e.target.files[0]);}}
                className=" border border-black border-dashed h-[30px] w-fit cursor-pointer "
                accept="image/png, image/jpeg" /> 
            </div>
 
            <div className="flex gap-3 overflow-auto border-2 border-black rounded-xl w-[100%] h-[150px] p-3">
                {images.map((e,index)=><img key={index}
                  title="click to remove"
                  onClick={()=>{const fil=images.filter((e,index2)=>!(index==index2));setImages(fil);notifyImageDelete()}}
                  src={e} 
                  className="cursor-pointer w-[100px] h-[100px] duration-100 hover:scale-75 hover:animate-pulse" 
                  />)}
            </div>
        </div>

        <div className="border border-black w-[100%]"></div>

        <div className="w-[100%] flex place-content-center gap-7">

            <div
             onClick={()=>{setFav(!fav)}} 
             className="h-[50px] w-[250px] cursor-pointer border-2 border-purple-600 bg-purple-300 p-2 text-md rounded-2xl duration-300 hover:translate-y-[-5px] flex place-content-center" >
                {fav?"Remove from Favourites":"Add to Favourites"}
            </div>

           { isSubmit? <div 
                className="h-[50px] w-[100px] cursor-pointer border-2 border-red-600 bg-red-600 p-2 text-2xl rounded-2xl duration-300 hover:translate-y-[-5px] flex place-content-center">
                    <img src="watch.png" className="h-[30px] animate-spin" alt="" />
            </div> :
            <div 
            onClick={()=>{isEditing? handleEdit():handleSubmit()}}
            className=" text-center h-[50px] w-[100px] cursor-pointer border-2 border-red-600 bg-red-600 p-2 text-2xl rounded-2xl duration-300 hover:translate-y-[-5px]">
                Save
            </div>}
        </div>


    </div>
    </>)
}