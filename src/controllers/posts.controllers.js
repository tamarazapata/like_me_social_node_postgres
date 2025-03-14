import {
    getPosts,
    addPost,
    setPost,
    destroyPost
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
      const newPost = await addPost({ title, image_url, post_description, likes });
      res.status(201).json({ post: newPost });
    } catch (error) {
      console.log("Error en addPost:", error);
      return res.status(500).json({ error: "Error al añadir el post" });
    }
  };

  const updatePost = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, image_url, post_description, likes } = req.body;
  
      // Obtener el post actual antes de actualizarlo
      const posts = await getPosts();
      const oldPost = posts.find(post => post.id == id);
  
      if (!oldPost) {
        return res.status(404).json({ error: "Post no encontrado" });
      }
  
      const post = await setPost(title, image_url, post_description, likes, id, oldPost);
      res.status(200).json({ message: "Post actualizado", post });
    } catch (error) {
      console.error("Error al actualizar el post:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  };
  

  const deletePost = async (req, res) => {
    try {
      console.log("Intentando eliminar post con ID:", req.params.id);  // Para depurar
      const { id } = req.params;
      const result = await destroyPost(id);
  
      if (!result || result.rowCount === 0) {
        return res.status(404).json({ error: "Post no encontrado" });
      }
  
      res.status(200).json({ message: "Post eliminado con éxito" });
    } catch (error) {
      console.error("Error en deletePost:", error);
      const errorFound = findError(error.code) || [{ status: 500, message: "Error interno del servidor" }];
  
      return res.status(errorFound[0].status).json({
        error: errorFound[0].message,
        type: errorFound[0].type || "Desconocido",
      });
    }
  };
  

export{getAllPosts, createPosts, updatePost, deletePost}