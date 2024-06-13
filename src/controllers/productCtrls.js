
import ProductManager from "../dao/productManagerDB.js";

const productManager = new ProductManager();

export const getProducts = async (req, res) => {
  const limit = parseInt(req.query.limit,10)|| 10;
  const products = await productManager.getProducts({limit});
  res.render("products", { products });
};

export const getProductById = async (req, res) => {
  const pid = parseInt(req.params.pid,10);
  const product = await productManager.getProductsById(pid);
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
    !product.stock || !category
  ) {
    return res.status(400).json({
      status: "error",
      error: "faltan datos del producto",
    });
  }
  const newProduct = await productManager.addProduct(product);
  req.io.emit("productCreated", newProduct);
  res.status(201).json({
    status: "success",
    message: "Producto creado",
    product: newProduct,
  });
};

export const updateProduct = async (req, res) => {
  const pid = parseInt(req.params.pid,10);
  const product = req.body;
  const existingProduct = await productManager.getProductsById(pid);
  if (!existingProduct) {
    return res.status(404).json({
      status: "error",
      error: ` el ID:${pid} no existe`,
    });
  }
  const updatedProduct = await productManager.updateProduct(pid, product);
  res.json({ updatedProduct });
};

export const deleteProduct = async (req, res) => {
  const pid = parseInt(req.params.pid,10);
  const existingProduct = await productManager.getProductsById(pid);
  if (!existingProduct) {
    return res.status(404).json({
      status: "error",
      error: `No se puede eliminar un producto con el ID:${pid} que no existe`,
    });
  }
  await productManager.deleteProduct(pid);
  req.io.emit("productDeleted", pid);
  res.status(200).json({ message: "Producto eliminado correctamente" });
};

export const deleteProducts = async (req, res) => {
  await productManager.deleteProduct();
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

