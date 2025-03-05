import pool from "../../db/conection.db.js";

const getPosts = async () => {
  const SQLquery = { text: "SELECT * FROM posts" };
    const response = await pool.query(SQLquery);
    return response.rows;
};


const createPost = async ({ title, image_url, post_description, likes }) => {
  const SQLquery = {
    text: "INSERT INTO posts (title, image_url, post_description, likes) VALUES ($1, $2, $3, $4) RETURNING *",
    values: [title, image_url, post_description, likes],
  };
    const response = await pool.query(SQLquery);
    return response.rows[0];
};

// const updateTravel = async (id, { presupuesto }) => {
//   const SQLquery = {
//     text: "UPDATE travels SET presupuesto = $1 WHERE id = $2 RETURNING *",
//     values: [presupuesto, id],
//   };
//     const response = await pool.query(SQLquery);
//     return response.rows[0];
// }

// const destroyTravel = async (id) => {
//   const SQLquery = {
//     text: "DELETE FROM travels WHERE id = $1",
//     values: [id],
//   };
//     const response = await pool.query(SQLquery);
//     return response.rowCount;
// };

export {getPosts, createPost}
// export { getTravels, createTravel, updateTravel, destroyTravel };