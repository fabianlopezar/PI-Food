const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const axios = require("axios");
const { Recipe, TypeDiet } = require("../db.js");
const API_KEY = "91eea5f84dac4e41b0697d6671ad384c";/*principal */
//const API_KEY = "d0a7c1bfeae2404c9df2b6a16cf26fd7";/*principal */
//const API_KEY = "477281183eac4b20995102b9b11b6249";/*principal */

const{Sequelize}=require("sequelize")
const { diets } = require ("./controllers.js");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getApiInfo = async () => {
    try{
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
    const apiInfo = await apiUrl.data.results.map((el) => {
      return {
        id: el.id,
        title: el.title,
        img: el.image,
        TypeDiet: el.diets.map((index) => {return { name: index };}), //me retorna un array con los nombre
        dishTypes: el.dishTypes.map((index) => {return { name: index };}), //me retorna un array con los tipos de platos
        summary: el.summary,
        healthScore: el.healthScore,
        analyzedInstructions: el.analyzedInstructions, // me retorna el paso a paso
      };
    });
    return apiInfo;
}catch(error){
      console.log("Sucedio un error en getApiInfo",error)
    }
  };
  //------------------- FUNCION OBTENER LA DATA BASE ---------------------------------------------------------------------
  const getDbInfo = async () => {
    try{
      return await Recipe.findAll({
      include: {
        model: TypeDiet,
        attributes: ["name"], //traigo el nombre de los tipos de recetas
        through: {
          attributes: [], //tomo solo lo que me queda en el arreglo attributes
        },
      },
    });}catch(error){
      console.log("Sucedio un error en getDbInfo: ",error)
    }
  };
  //------------------ FUNCION UNIR INFORMACION ----------------------------------------------------------------------
  const getAllRecipes = async () => {
  try{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
}catch(error){
        console.log("Sucedio un error en getAllRecipes: ",error)
    }
  };
//-------------------------  RUTAS  ------------------------------------------------
//------------------------- /RECIPES ------------------------------------------------
router.get("/recipes", async (req, res) => {
  try{
    const {name}=req.query
    let recipesTotal=await getAllRecipes();
    if(name){
        let recipesTitle= await recipesTotal.filter((el)=>el.title.toLowerCase().includes(name.toLowerCase())
        );
        recipesTitle.length //el tamaño de mi arreglo siempre sera 1
        ?res.status(200).send(recipesTitle)
        :res.status(404).send(`🍽️ No se encontro La receta ${name}. 🍽️`)
    }else{
        res.status(200).send(recipesTotal);
    }
  }catch(error){error}

});
  //--------------------  /RECIPES{idReceta}:  ------------------------------------------------------
router.get("/recipes/:id",async(req,res)=>{
    try{
        const id =req.params.id;
        const recipesTotal=await getAllRecipes();
        if(id){
            let recipeId= await recipesTotal.filter((el)=>el.id==id)
            recipeId.length
            ?res.status(200).json(recipeId)
            :res.status(404).send("🍽️ I did not find that recipe. 🍽️")
        }
    }catch(error){
        console.log("Sucedio un error en /recipes:id ", error);
    }
})
//--------------------  /post  ------------------------------------------------------
router.post("/recipes",async(req,res)=>{
  const{title,summary,healthScore,analyzedInstructions,createdInDb,typeDiet}=req.body;
  if(!title ||!summary){return res.status(400).send("Deberia ingresar un title y un summary.")}
  
try{
  let createRecipe=await Recipe.create({title,summary,healthScore,analyzedInstructions,createdInDb})
  let TypeDietDb=await TypeDiet.findAll({
    where:{name:typeDiet}
  })
  await createRecipe.addTypeDiets(TypeDietDb)
  res.send("🍽️ Se creo exitosamente. 🍽️")}catch(error){console.log("error en post",error)}
})
//--------------------  /diets ------------------------------------------------------
router.get("/diets",async(req,res)=>{
  try{
  diets.forEach(el=>{
    TypeDiet.findOrCreate({
      where:{name:el.name}
    })
  })
  const allDiets=await TypeDiet.findAll();
  res.send(allDiets.map(el=>el.name));}
  catch(error){
    console.log("Sucedio un error en /diets: ",error);
  }
})
  
































module.exports = router;
