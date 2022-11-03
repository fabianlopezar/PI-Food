import React, { useState,useEffect } from "react";
import SearchBar from "../components/SearchBar";
import ContainerCards from "../components/ContainerCards";
import NavBar from "../components/NavBar";
import { useSelector,useDispatch } from "react-redux";
import Paginado from "../components/Paginado";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { orderScore, orderTitle,getRecipes, getTitle } from "../redux/actions";


export default function Home() {
  const allRecipes = useSelector((state) => state.recipes);
  //currentPage = pagina actual
  const [currentPage, setCurrentPage] = useState(1);
  //itemsPerPage = catidad de items por pagina
  const [itemsPerPage, setItemsPerPage] = useState(9);
  //                           1          9
  const indexOfLastItem = currentPage * itemsPerPage; //9
  //                         9                9
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; //0
  const currentItems = allRecipes.slice( indexOfFirstItem,indexOfLastItem);
  //
  const [orden,setOrden]=useState("");
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getRecipes())
    
  },[dispatch]);

  const paginado=(pageNumber)=>{
    setCurrentPage(pageNumber)
  }

  function handleSort(e){
    e.preventDefault()
    dispatch(orderTitle(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
}
function handleScore(e){

  e.preventDefault();
  dispatch(orderScore(e.target.value))
  setCurrentPage(1)
  setOrden(`Ordenado ${e.target.value}`)
  
}

  return (

    <div>
      <select onChange={(el)=>handleSort(el)}>
        <option>Order Alphabetic</option>
        <option value="asc">Ascendent ( A - Z )</option>
        <option value="des">Descendent ( Z - A )</option>
      </select>
      <select onChange={(el)=>handleScore(el)}>
          <option>Order Score Health</option>
          <option value="low">Low Health</option>
          <option value="high">High Health</option>
      </select>
      <NavBar setCurrentPage={setCurrentPage }/>
      <SearchBar />
      <Link to="/recipe"><button>Recipe Creator</button></Link>
      <Paginado itemsPerPage={itemsPerPage} allItems={allRecipes.length} paginado={paginado}/>

      {currentItems.length>0?
      (currentItems.map((el)=>(<div key={el.id}>
        <Card title={el.title}img={el.img}typeDiet={el.typeDiet}score={el.healthScore}id={el.id}/>
      </div>
      ))
      ):(<Loading/>)}
    </div>
  );
}
