import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Post from "./components/Post";

const urlBaseServer = "http://localhost:3000";

function App() {
  const [titulo, setTitulo] = useState("");
  const [imgSrc, setImgSRC] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get(urlBaseServer + "/posts");
  
      if (Array.isArray(response.data.posts)) {
        setPosts(response.data.posts);
      } else {
        console.error("Error: La API no devolvió un array en 'posts':", response.data);
        setPosts([]); 
      }
    } catch (error) {
      console.error("Error obteniendo posts:", error);
      setPosts([]); 
    }
  };
  

  // const agregarPost = async () => {
  //   const post = { titulo, url: imgSrc, descripcion };
  //   await axios.post(urlBaseServer + "/posts", post);
  //   getPosts();
  // };
  const agregarPost = async () => {
    const post = {
      title: titulo,
      image_url: imgSrc,
      post_description: descripcion,
      likes: 0, 
    };
    await axios.post(urlBaseServer + "/posts", post);
    getPosts(); 
  };
  

  
  // este método se utilizará en el siguiente desafío
  const like = async (id) => {
    await axios.put(urlBaseServer + `/posts/like/${id}`);
    getPosts();
  };

  // este método se utilizará en el siguiente desafío
  const eliminarPost = async (id) => {
    await axios.delete(urlBaseServer + `/posts/${id}`);
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>
      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            setTitulo={setTitulo}
            setImgSRC={setImgSRC}
            setDescripcion={setDescripcion}
            agregarPost={agregarPost}
          />
        </div>
        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
        {posts.map((post) => (
          <Post 
            key={post.id} 
            post={{ 
              id: post.id, 
              titulo: post.title, 
              img: post.image_url, 
              descripcion: post.post_description, 
              likes: post.likes 
            }} 
            like={like} 
            eliminarPost={eliminarPost} 
  />
))}
        </div>
      </div>
    </div>
  );
}

export default App;
