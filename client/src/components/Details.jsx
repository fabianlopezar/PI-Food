import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesId } from "../redux/actions.js";
import { useEffect } from "react";
import Loading from "./Loading"

export default function Details(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipesId(props.match.params.id));
  }, [dispatch]);

  const myRecipe= useSelector((state)=>state.details)
  return (
    <div>
        <Link to="/home"><button>Home</button></Link>
        {myRecipe.length>0?
            <div>
                <h1>{myRecipe[0].title}</h1>
            </div>:
        <Loading/>}
        
    </div>
  )
}
