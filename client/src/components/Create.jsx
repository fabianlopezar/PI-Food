import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postRecipes, getTypeDiet } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

import s from "../styles/Create.module.css"


function controlForm(input){
  const lim = new RegExp("^[0-9]+$")
  let errors = {}
  if(!input.title) errors.title = "you should enter a title";
  if(!input.summary) errors.summary="you should enter a summary";
  if(input.healthScore < 0 || input.healthScore > 100 || !lim.test(input.healthScore))errors.healthScore="you should enter a Score between 0 - 100";
  return errors;
}
//----------------------------
export function Create() {
  //----------- CONSTANTES LOCALES Y GLOBALES------------------------
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.typeDiet);
  const [errors,setErrors]=useState({});
  const [input,setInput]= useState({
    title:"",
    summary:"",
    healthScore:"",
    analyzedInstructions:"",
    typeDiet:[] 
 })
useEffect(()=>{
  dispatch(getTypeDiet())
},[dispatch])
//-------------------- MANEJADORES --------------------------------------------------
//----------- CHANGE -----------------------
function handleChange(e){
  setInput({
    ...input,
    [e.target.name]:e.target.value
  })
  setErrors(controlForm({
    ...input,
    [e.target.name]:e.target.value
  }))
}
//-------- SELECT -----------------------------------
function handleSelect(e){
  setInput({
    ...input,
    typeDiet:[...input.typeDiet,e.target.value]
  })
}
//------- SUBMIT ----------------------------------------------
function handleSubmit(e){
  e.preventDefault();
  dispatch(postRecipes(input))
  alert("The recipe was created successfully. ✔️")
  setInput({
    title:"",
    summary:"",
    healthScore:"",
    analyzedInstructions:"",
    typeDiet:[] 
  })
}
function handleDelete(e){
  setInput({
    ...input,
    typeDiet:input.typeDiet.filter(el=>el!==e)
  })
}

//-------------------- RENDERIZADO -----------------------------------------------------------------------------------
return (
  <div >
    <Link to="/home">
      <button className={s.button}>BACK</button>
    </Link>
    <div className={s.card}>
    <h1 className={s.title}>Recipe Creator</h1>
    <form className={s.ent} onSubmit={(e)=>{handleSubmit(e)}}>
      <div>
        <label className={s.label}>title:</label>
        <input type="text" value={input.title} name="title" onChange={(e)=>{handleChange(e)}}/>
        {errors.title && (<p>{errors.title}</p>)}
      </div>
      <div>
        <label className={s.label}>summary:</label>
        <input type="text" name="summary" value={input.summary} onChange={(e)=>{handleChange(e)}}/>
        {errors.sumary && (<p>{errors.summary}</p>)}
      </div>
      <div>
        <label className={s.label}>healthScore:</label>
        <input type="text" name="healthScore" value={input.healthScore} onChange={(e)=>handleChange(e)}/>
        {errors.healthScore&&(<p className={s.labelError}>{errors.healthScore}</p>)}
      </div>
      <div>
        <label className={s.label}>analyzedInstructions:</label>
        <input type="text" name="analyzedInstructions" value={input.analyzedInstructions} onChange={(e)=>{handleChange(e)}}/>
      </div>
      <label className={s.label}>Diet:</label>
      <select onChange={(e)=>{handleSelect(e)}}>
        {diets?.map((el)=>{
          return <option key={el}value={el}>{el}</option>
        })}
      </select>
      {errors.hasOwnProperty("title") || errors.hasOwnProperty("summary") ||errors.hasOwnProperty("healthScore")? <p>you should complete all the inputs</p>:<button type="submit">Create new Recipe</button>}
    </form>

    {input.typeDiet.map((el)=>{
      return(
        <div key={el}>
          <h5 className={s.label}>{el}</h5>
          <button  className={s.button} onClick={()=>handleDelete(el)}>X</button>
        </div>
      )
    })}
    </div>
  </div>
  )
}
