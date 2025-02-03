import { useSpeechToText } from "../hooks/useSpeechToText";


export function VoiceMemo(props){
   const {textArea,setTextArea}=props.data;


   const {isListening,transcript,startListening,stopListening}=useSpeechToText({continuous:true})


   const startStopListening = ()=>{
    isListening?stopVoiceInput():startListening();
   }

   const stopVoiceInput=()=>{
   
    setTextArea(textArea + " " + transcript);
    stopListening();
   }

    return(<>
    <div className="flex flex-col gap-1">
            <div 

            onClick={()=>{startStopListening(); setTimeout(()=>{ stopVoiceInput()},60000)}}
            className="cursor-pointer border-2 border-red-600 bg-green-600 p-1 w-[100px] text-center rounded-2xl "
            style={isListening?{backgroundColor:"red",border:"2px green solid"}:null}>
                {isListening ? "Stop": "Speak"}
            </div>

            <textarea name="textArea" 
            placeholder="Enter the Details"
            className="w-[100%] h-[300px] p-2 text-xl border-2 border-black rounded-xl " 
            id="contentArea"
            disabled={isListening}
            value={isListening ? textArea +" " + transcript:textArea }
            onChange={(e)=>{setTextArea(e.target.value)}}
            >
            </textarea>
        </div>
    </>)
}