import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export function useSpeechToText(options){


    const [isListening,setIsListening]=useState(false);
    const [transcript,setTranscript]=useState("");

    const recognitionRef=useRef(null);

    useEffect(()=>{


        if(!("webkitSpeechRecognition" in window)){
            console.error("Web Speech Api not supported")
        }

        recognitionRef.current=new window.webkitSpeechRecognition();
        const recognition= recognitionRef.current;

        recognition.interimResults=options.interimResults || true;
        recognition.lang = options.lang || "en-US";
        recognition.continuous=options.continuous || false;
    
        if("webkitSpeechGrammarList" in window){
            const grammar = " #JSGF V1.0; grammar punctuations; public <punc>= . | , | ? | ! | ; | : ;"

            const SpeechRecognitionList=new window.webkitSpeechGrammarList();

            SpeechRecognitionList.addFromString(grammar,1);
            recognition.grammars=SpeechRecognitionList
        }

        recognition.onresult= (event)=>{
            let text = "";
            for(let i=0;i<event.results.length;i++){
                text+=event.results[i][0].transcript;
            }
            setTranscript(text);
        }

        recognition.onerror = (event)=>{
            console.error("recognition error" , event.error);
        }

        recognition.onend = ()=>{
            setIsListening(false);
            setTranscript("");
        }
    

        return ()=>{recognition.stop};
    },[])


    const startListening = ()=>{
        if(recognitionRef.current && !isListening){
            recognitionRef.current.start();
            setIsListening(true);
        }
    }
    const stopListening = ()=>{
        recognitionRef.current.stop();
        setIsListening(false);

    }

    return {
        isListening,
        transcript,
        startListening,
        stopListening
    }
}