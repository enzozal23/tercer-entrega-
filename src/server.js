import express from "express";
import router from "./router/product.routes.js";
import cartsRouter from "./router/carts.routes.js";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import ViewsRouter from "./router/views.routes.js";

import mongoose from "mongoose";
import { configSocket } from "./utils/socketConect.js";

const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () => {
  console.log(` listener on port http://localhost:${PORT}`);
});


const io = configSocket(httpServer)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// conect mongodb atlas
const uri = 'mongodb+srv://enzo-coderback:cSU3re9634dzg1tb@cluster0.f9fcrmm.mongodb.net/Ecommerce';
mongoose.connect(uri).then(() => {
  console.log('Database connected')
}).catch(err => {
  console.log('esto es un error de mongo', err)
})

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


app.use('/chat', (req, res, next) => {
  req.io = io;
  next();
},
  ViewsRouter)

app.use("/api/carts", cartsRouter);
