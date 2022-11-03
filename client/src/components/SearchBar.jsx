import React,{ useState } from "react";
import { useDispatch } from "react-redux";
//importo desde las actions de redux
import {getTitle} from "../redux/actions.js"

export default function SearchBar(){
    //----------------------------------
    const dispatch = useDispatch();
    const [ title, setTitle ] = useState("");
    //----------------------------------
    function handleInputChange(e){
        e.preventDefault();
        setTitle(e.target.value);
        console.log(title)
    }
    //----------------------------------
    function handleSubmit(e){
        
        e.preventDefault();
        if(title!==""){
            //dispacho la accion que cree en actions
            dispatch(getTitle(title));
            console.log("deberia funcionar")
            setTitle("")//Limpio el input
        }else{
            alert("Debe ingresar el nombre de una receta.")
        } 
    }
    //----------------------------------
    return (
    <div>
       <input type="text" placeholder="Insert Recipe Name"
       onChange={(e)=>handleInputChange(e)}
       />
       <button type="submit" onClick={(e)=>handleSubmit(e)}>Search</button>
    </div>
    )
}