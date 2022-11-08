import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/Card.module.css"

export default function Card({id,title,img,typeDiet,score}) {
  return (
    <div className={style.card} key={id}>
      <Link to={`/recipes/${id}`}>
        <h3 className={style.title}>Title: {title}</h3>
      </Link>
      <img className={style.img} src={img} alt="no have img" width="200px" height="250px"/>
      {typeDiet?.map(el=><h5 key={el.name}>{}{el.name}</h5>)}
      <h5 className={style.h5}>healthScore: {score}/100</h5>
    </div>
  );
}

///recipes/:id