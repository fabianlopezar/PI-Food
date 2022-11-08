import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/Landing.module.css"

export default function Landing(){
    return (
        <div>
            <h1 className={style.title}>¡ 🥣Bienvenidos🥣 !</h1>
            <h1 className={style.subTitle}>🍳 Proyecto 🥗 Individual 🥗 Food 🍳</h1>
            <Link to="/home">
                <button className={style.button}>Ingresar</button>
            </Link>
        </div>
    )
}