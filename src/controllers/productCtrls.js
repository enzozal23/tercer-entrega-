import { Server } from "socket.io";
import ProductManager from "../components/ProductManager.js";

const productManager = new ProductManager("./models/products.json");

export const getProducts = async (req, res) => {
  const limit = parseInt(req.query.limit);
  const products = await productManager.getProducts(limit);
  res.render("products", { products });
};

export const getProductById = async (req, res) => {
  const pid = parseInt(req.params.pid);
  const product = await productManager.getProductById(pid);
  if (!product) {
    return res.status(404).json({
      status: "error",
      error: "Producto no encontrado",
    });
  }
  res.json({ product });
};

export const addProduct = async (req, res) => {
  const product = req.body;
  if (
    !product.title ||
    !product.description ||
    !product.price ||
    !product.code ||
    !product.stock
  ) {
    return res.status(400).json({
      status: "error",
      error: "faltan datos del producto",
    });
  }
  const newProduct = await productManager.addProducts(product);
  req.io.emit("productCreated", newProduct);
  res.status(201).json({
    status: "success",
    message: "Producto creado",
    product: newProduct,
  });
};

export const updateProduct = async (req, res) => {
  const pid = parseInt(req.params.pid);
  const product = req.body;
  const existingProduct = await productManager.getProductsById(pid);
  if (!existingProduct) {
    return res.status(404).json({
      status: "error",
      error: ` el ID:${pid} no existe`,
    });
  }
  const updatedProduct = await productManager.updateProducts(pid, product);
  res.json({ updatedProduct });
};

export const deleteProduct = async (req, res) => {
  const pid = parseInt(req.params.pid);
  const existingProduct = await productManager.getProductsById(pid);
  if (!existingProduct) {
    return res.status(404).json({
      status: "error",
      error: `No se puede eliminar un producto con el ID:${pid} que no existe`,
    });
  }
  await productManager.deleteProducts(pid);
  req.io.emit("productDeleted", pid);
  res.status(200).json({ message: "Producto eliminado correctamente" });
};

export const deleteProducts = async (req, res) => {
  await productManager.deleteProducts();
  res.json({
    status: "success",
    message: "Todos los productos han sido eliminados",
  });
};

export const getHome = async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { products });
};

export const getRealTimeProducts = async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realTimeProducts", { products });
};

export function productsSocket(server) {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("usuario conectado", socket.id);

    socket.on("createProduct", async (product) => {
      await productManager.addProducts(product);
      io.emit("productCreated", product);
    });

    socket.on("deleteProduct", async (id) => {
      await productManager.deleteProducts(id);
      io.emit("productDeleted", id);
    });

    socket.on("disconnect", () => {
      console.log(`usuario ${socket.id} desconectado`);
    });
  });
}
