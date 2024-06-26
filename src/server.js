import express from "express";
import router from "./router/api/products.routes.js";
import cartsRouter from "./router/api/carts.routes.js";
import { connectDB, objectConfig } from './config/index.js'
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import ViewsRouter from "./router/views.routes.js";
import cookieParser from 'cookie-parser'
import session from 'express-session'
import mongoose from "mongoose";
import { configSocket } from "./utils/socketConect.js";
import pruebasRouter from './router/pruebas.js'
import sessionsRouter from "./router/sessions.router.js";
import MongoStore from 'connect-mongo'
import passport from 'passport'
import { initializePassport } from './config/passport.config.js'
import dotenv from 'dotenv';

dotenv.config();




const app = express();
const { port } = objectConfig
const httpServer = app.listen(port, () => {
  console.log(` listener on port http://localhost:${port}`);
});
const io = configSocket(httpServer)

app.use(express.json()); // servidor puede leer json 
app.use(express.urlencoded({ extended: true })); //para que el servidor reciba a traves de un formulario y convertirlo en un objeto javascript
app.use(cookieParser())

app.use(session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
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

// endpoints
app.use("/", ViewsRouter);
// app.get("/realTimeProducts", ViewsRouter);

app.use(
  "/api/products",
  (req, res, next) => {
    req.io = io;
    next();
  },
  router
);

app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/chat', (req, res, next) => {
  req.io = io;
  next();
},
  ViewsRouter)

app.use("/api/carts", cartsRouter);
app.use('/pruebas', pruebasRouter)
app.use('/api/sessions', sessionsRouter)