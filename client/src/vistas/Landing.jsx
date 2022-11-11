import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/Landing.module.css"

export default function Landing(){
    return (
        <div className={style.div}>
            <h1 className={style.title}>¡ 🥣Welcome🥣 !</h1>
            <h1 className={style.subTitle}>🍳 Individual 🥗 Proyect 🥗 Food 🍳</h1>
            <Link to="/home">
                <button className={style.btn}>Enter</button>
            </Link>
        </div>
    )
}