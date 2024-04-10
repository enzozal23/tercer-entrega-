import { promises as fs } from "fs";
import { nanoid } from "nanoid";

class ProductManager {
  constructor() {
    this.path = "./src/models/products.json";
  }

  readProducts = async () => {
    let products = await fs.readFile(this.path, "utf-8");
    return JSON.parse(products);
  };

  writeProducts = async (product) => {
    await fs.writeFile(this.path, JSON.stringify(product));
  };

  addProducts = async (product) => {
    let productsOld = await this.readProducts();
    product.id = nanoid();
    let productAll = [...productsOld, product];
    await this.writeProducts(productAll);
    return "Producto Agregado";
  };

  getProducts = async () => {
    return await this.readProducts();
  };

  exist = async (id) => {
    let products = await this.readProducts();
    return products.find((prod) => prod.id === id);
  };

  getProductsById = async (id) => {
    let ProductById = await this.exist(id);
    if (!ProductById) return "Producto no encontrado";
    return ProductById;
  };

  updateProducts = async (id, product) => {
    let ProductById = await this.exist(id);
    if (!ProductById) return "Producto no encontrado";
    await this.deleteProducts(id);
    let productsOld = await this.readProducts();
    let products = [{ ...product, id: id }, ...productsOld];
    await this.writeProducts(products);
    return "Producto actualizado";
  };

  deleteProducts = async (id) => {
    let products = await this.readProducts();
    let existProducts = products.some((prod) => prod.id === id);
    if (existProducts) {
      let filterProducts = products.filter((prod) => prod.id != id);
      await this.writeProducts(filterProducts);
      return "Producto eliminado";
    }
    return "Producto a eliminar inexistente";
  };
}

export default ProductManager;
