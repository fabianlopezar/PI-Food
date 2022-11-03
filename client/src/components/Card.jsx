import React from "react";
import { Link } from "react-router-dom";

export default function Card({id,title,img,typeDiet,score}) {
  return (
    <div key={id}>
      <Link to={`/recipes/${id}`}>
      <h3>Title: {title}</h3>
      </Link>
      <img src={img} alt="no have img" width="200px" height="250px"/>
      {typeDiet?.map(el=><h5 key={el.name}>{}{el.name}</h5>)}
      <h5>healthScore: {score}/100</h5>
    </div>
  );
}

///recipes/:id