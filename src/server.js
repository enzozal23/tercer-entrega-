import express from "express";
import routerApp from './router/index.js'
// import cartsRouter from "./router/api/carts.routes.js";
import { connectDB, objectConfig } from './config/index.js'
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import ViewsRouter from "./router/views.routes.js";
import cookieParser from 'cookie-parser'
import session from 'express-session'
import mongoose from "mongoose";
import { configSocket } from "./utils/socketConect.js";
// import pruebasRouter from './router/pruebas.js'
// import sessionsRouter from "./router/sessions.router.js";
import MongoStore from 'connect-mongo'
import passport from 'passport'
import { initializePassport } from './config/passport.config.js'
import dotenv from 'dotenv';
import cors from 'cors'
import { handleErrors } from './middlewares/errors/index.js'
import { addLogger, logger } from './utils/logger.js'
import swaggerUiExpress from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
dotenv.config();

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Documentación de mi E-commerce',
      description: 'Api detallada para documentar los modulos, productos y carrito'
    }
  },
  apis: [`./src/docs/**/*.yaml`]
}


const app = express();
const { port } = objectConfig
const httpServer = app.listen(port, error => {
  if (error) logger.info(error)
  logger.info(` listener on port http://localhost:${port}`);
});
const io = configSocket(httpServer)
const specs = swaggerJsdoc(swaggerOptions)
app.use(express.json()); // servidor puede leer json 
app.use(express.urlencoded({ extended: true })); //para que el servidor reciba a traves de un formulario y convertirlo en un objeto javascript
app.use(cookieParser())

app.use(session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    // mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl: 60 * 60 * 1000 * 24
  }),
  secret: 'Firmasecreta',
  resave: true,
  saveUninitialized: true
}))


initializePassport()
app.use(passport.initialize())
app.use(passport.session())


// conect mongodb atlas
connectDB()
// configuracion handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true, // esto era lo que no me dejaba mostrar los productos 
    },
  })
);
// set direccion de vistas
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.use(cors())
app.use(addLogger)
app.use(routerApp)

// endpoints
app.use("/", ViewsRouter);
app.use(handleErrors())