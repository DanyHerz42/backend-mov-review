import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';
import helmet from 'helmet';
// import cors from 'cors';
import {createRoles} from './libs/initialSetup';
import rateLimit from 'express-rate-limit';
//importacion de rutas
import authRoutes from './routes/auth.routes';
import moviesRoutes from './routes/movies.routes';
import usersRoutes from './routes/user.routes'

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100
// })

//configuracion de express
const app = express();

createRoles();
app.set("pkg", pkg)
app.set("port", process.env.PORT || 4000);

app.use(morgan('dev'));
app.use(express.json())
app.use(helmet())
// app.use(cors())

//ruta inicial de API
app.get("/", (req, res) => {
    res.json({
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        name: app.get('pkg').name,
        version: app.get('pkg').version
    })
})

//rutas

app.use("/sign", authRoutes);
app.use("/movies", moviesRoutes);
app.use("/users", usersRoutes);

export default app;