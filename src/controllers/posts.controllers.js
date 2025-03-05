import {
    getPosts
    ,createPost
    // ,
    // createTravel,
    // updateTravel,
    // destroyTravel,
  } from "../models/posts.models.js";
  
  import { findError } from "../utils/utils.js";


  
  const getAllPosts = async (req, res) => {
    try {
      const posts = await getPosts();
      res.status(200).json({ posts: posts });
    } catch (error) {
      console.log("Error detectado:", error);
      const errorFound = findError(error.code) || [{ status: 500, message: "Error interno del servidor" }];
      return res
      
        .status(errorFound[0].status)
        .json({ error: errorFound[0].message });
    }
  };
  
  const createPosts = async (req, res) => {
    try {
      const { title, image_url, post_description, likes } = req.body;
      const newPost = await createPost({ title, image_url, post_description, likes });
      res.status(201).json({ travel: newPost });
    } catch (error) {
      console.log("Error en createPost:", error);
      return res.status(500).json({ error: "Error al crear el post" });
    }
  };
  
  
//   const updateTravels = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const travel = req.body;
//       const travel_update = await updateTravel(id, travel);
  
//       res.status(200).json({ travel: travel_update });
//     } catch (error) {
//       console.error("Error en updateTravels:", error); // 👈 Agregar log para depurar errores
  
//       const errorFound = findError(error.code) || [{ status: 500, message: "Error interno del servidor" }];
      
//       return res.status(errorFound[0]?.status || 500).json({ 
//         error: errorFound[0]?.message || "Error desconocido" 
//       });
//     }
//   };
  
//   const deleteTravels = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const deleteTravel = await destroyTravel(id);
//       if (deleteTravel === 0) {
//         return res.status(404).json({ message: "No existe el registro" });
//       }
//       res.status(200).json({ message: "registro eliminado con exito" });
//     } catch (error) {
//       const errorFound = findError(error.code) || [{ status: 500, message: "Error interno del servidor" }];
//       return res//.status(errorFound[0].status).json({ error: errorFound[0].message });
//         .status(errorFound[0].status)
//         .json({ error: errorFound[0].message });
//     }
//   };
  
//   export { getAllTravels, createTravels, updateTravels, deleteTravels };

export{getAllPosts, createPosts}