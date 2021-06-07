import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';
import helmet from 'helmet'
import {createRoles} from './libs/initialSetup'
//importacion de rutas
import authRoutes from './routes/auth.routes';

//configuracion de express
const app = express();

createRoles();
app.set("pkg", pkg)
app.set("port", process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json())
app.use(helmet())

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

app.use("/", authRoutes);


export default app;