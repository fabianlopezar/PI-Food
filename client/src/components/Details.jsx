import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesId } from "../redux/actions.js";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading"

export default function Details() {
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(() => {
    dispatch(getRecipesId(id));
  }, []);

  const myRecipe= useSelector((state)=>state.details)
  return (  
    <div>
        <Link to="/home"><button>Home</button></Link>
        {myRecipe.length>0?
            <div>
                <h1>{myRecipe[0].title}</h1>
                <img src={myRecipe[0].img?myRecipe[0].img:"https://st.depositphotos.com/1036708/2191/i/600/depositphotos_21918797-stock-photo-knife-and-fork-with-plate.jpg"}/>
                <h3>Type Diet: {myRecipe[0].TypeDiet.map(el=>el.name)}</h3>
                <h3>Dish Types: {myRecipe[0].dishTypes[0].name}</h3>
                <h3>Summary: {myRecipe[0].summary}</h3>
                <h5>HealthScore: {myRecipe[0].healthScore}</h5>
                <h5>Analyzed Instructions: {Array.isArray(myRecipe[0].analyzedInstructions)?myRecipe[0].analyzedInstructions.map(el=>el.steps.map(elem=>elem.step)):myRecipe[0].analyzedInstructions}</h5>
            </div>:
        <Loading/>}
        {console.log("hola el componente Detail: ",myRecipe)}
    </div>
  )
}
