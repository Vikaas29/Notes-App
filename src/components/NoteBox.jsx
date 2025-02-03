export function NoteBox(props){

    const {title,content,images,fav}=props.data.e.data;
    const {setShowNote,setCurrentNote}=props.data;

    const length=images.length;

    return (<>
    
    <div 
    onClick={()=>{
        setShowNote(true);
        setCurrentNote(props.data.e)

    }}
    className="bg-white cursor-pointer flex flex-col justify-start items-center gap-1 p-4 border border-pink-500 rounded-3xl w-[200px] h-[300px] duration-300 shadow-gray-500 shadow-xl hover:translate-y-[-10px] hover:shadow-2xl hover:border-4 hover:border-purple-600"
    >

        <div className="w-[100%] truncate text-2xl">{title}</div>
        <div className="border border-black w-[100%]"></div>
        <div className="w-[100%] h-[80%] text-wrap truncate">{content}</div>
        <div className="border border-black w-[100%]"></div>
        <div className="w-[100%] flex justify-end items-center  ">
        <div className="w-[100%]">Images:{length}</div>
        <div><img src={fav?"Fav.png":"notFav.png"} alt="" className="w-[20px] rounded-[50%] bg-black" /></div>
        </div>
    </div>
    
    </>)
}