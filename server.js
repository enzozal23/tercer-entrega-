import express from "express";
import ProductRouter from "./src/router/product.routes.js";
import cartsRouter from "./src/router/carts.routes.js";
import { __dirname } from "./src/utils.js";
import handlebars from "express-handlebars";
import ViewsRouter from "./src/router/views.routes.js";
import { productsSocket } from "./src/controllers/productCtrls.js";

const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
const io = productsSocket(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configuracion handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
  })
);
// set direccion de vistas
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

// endpoints
app.get("/", ViewsRouter);
app.get("/realTimeProducts", ViewsRouter);

app.use(
  "/api/products",
  (req, res, next) => {
    req.io = io;
    next();
  },
  ProductRouter
);

app.use("/api/carts", cartsRouter);
