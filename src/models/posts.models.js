import pool from "../../db/conection.db.js";


const getPosts = async () => {
  const SQLquery = { text: "SELECT * FROM posts" };
    const response = await pool.query(SQLquery);
    return response.rows;
};

const addPost = async ({ title, image_url, post_description, likes }) => {
  const SQLquery = {
    text: "INSERT INTO posts (title, image_url, post_description, likes) VALUES ($1, $2, $3, $4) RETURNING *",
    values: [title, image_url, post_description, likes],
  };
    const response = await pool.query(SQLquery);
    return response.rows[0];
};

const setPost = async (title, image_url, post_description, likes, postId, oldData) => {
  const newTitle = title || oldData.title
  const newImageUrl = image_url || oldData.image_url
  const newPostDescription = post_description || oldData.post_description
  const newLikes = likes || oldData.likes

  const SQLquery = {
    text: "UPDATE posts SET title = $1, image_url = $2, post_description = $3, likes = $4 WHERE id = $5 RETURNING *",
    values: [newTitle, newImageUrl,newPostDescription,newLikes,  postId],
  };
  
  const response = await pool.query(SQLquery);
  return response.rows[0];
}

const postById = async (id) => {
  const SQLquery = {
    text: "SELECT * FROM posts WHERE id = $1",
    values: [Number(id)]
  };
  const response = await pool.query(SQLquery);
  return response.rows[0];
}

const destroyPost = async (id) => {
  const SQLquery = {
    text: "DELETE FROM posts WHERE id = $1",
    values: [Number(id)]
  };
  const response = await pool.query(SQLquery);
  return response.rowCount;
}

export {getPosts, addPost, setPost, postById, destroyPost}
