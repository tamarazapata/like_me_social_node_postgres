import express from 'express';
import cors from 'cors';
import { envs } from './config/envs.js';
import travelRoutes from './routes/posts.routes.js'; 

const app = express();

app.use(cors());
app.use(express.json()); 

app.use('/api', travelRoutes); 

const port = envs.PORT;
app.listen(port, () => console.log(`Servidor encendido en el puerto! ${port}`));
