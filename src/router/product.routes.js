
import express from "express";
import ProductManager from "../dao/productManagerDB.js";

const router = express.Router();
const product = new ProductManager();

router.get("/", async (req, res) => {
  res.send(await product.getProducts());
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await product.getProductById(id));
});

router.post("/", async (req, res) => {
  let newProduct = req.body;
  res.send(await product.addProduct(newProduct));
});

router.put("/:id", async (req, res) => {
  let id = req.params.id;
  let updateProducts = req.body;
  res.send(await product.updateProduct(id, updateProducts));
});

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await product.deleteProduct(id));
});

export default router;
