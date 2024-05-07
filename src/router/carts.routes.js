import { Router } from "express";
import CartManager from "../components/CartManagerFs.js";

const cartsRouter = Router();
const carts = new CartManager();

cartsRouter.post("/", async (req, res) => {
  res.send(await carts.addCarts());
});

cartsRouter.get("/", async (req, res) => {
  res.send(await carts.readCarts());
});

cartsRouter.get("/:id", async (req, res) => {
  res.send(await carts.getCartsById(req.params.id));
});

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;
  res.send(await carts.addProductsInCart(cartId, productId));
});

export default cartsRouter;
