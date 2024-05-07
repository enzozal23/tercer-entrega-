import { promises as fs } from "fs";
import { nanoid } from "nanoid";
import ProductManager from "./productManagerFs.js";

const productAll = new ProductManager();

class CartManager {
  constructor() {
    this.path = "./src/json/carts.json";
  }

  readCarts = async () => {
    let carts = await fs.readFile(this.path, "utf-8");
    return JSON.parse(carts);
  };

  writeCarts = async (cart) => {
    await fs.writeFile(this.path, JSON.stringify(cart));
  };

  exist = async (id) => {
    let carts = await this.readCarts();
    return carts.find((cart) => cart.id === id);
  };

  getCartsById = async (id) => {
    let cartById = await this.exist(id);
    if (!cartById) return "Carrito no encontrado";
    return cartById;
  };

  addCarts = async () => {
    let cartsOld = await this.readCarts();
    let id = nanoid();
    let newCart = { id: id, products: [] };
    let cartsConcat = [...cartsOld, newCart];
    await this.writeCarts(cartsConcat);
    return "Carrito agregado";
  };
  addProductsInCart = async (cartId, productId) => {
    let cartById = await this.exist(cartId);
    if (!cartById) return "Carrito no encontrado";
    let productById = await productAll.exist(productId);
    if (!productById) return "Producto no encontrado";

    // Verificamos si cartById tiene la propiedad 'products'
    if (!cartById.products) {
      cartById.products = [];
    }

    let cartsAll = await this.readCarts();
    let cartFilter = cartsAll.filter((cart) => cart.id != cartId);

    //si el producto está en el carrito se le suma uno
    if (cartById.products.some((prod) => prod.id === productId)) {
      let moreProductInCart = cartById.products.find(
        (prod) => prod.id === productId
      );
      moreProductInCart.cantidad++;
      let cartsConcat = [cartById, ...cartFilter];
      await this.writeCarts(cartsConcat);
      return "Producto sumado al carrito";
    }

    cartById.products.push({ id: productById.id, cantidad: 1 });
    let cartsConcat = [cartById, ...cartFilter];
    await this.writeCarts(cartsConcat);
    return "Producto agregado al carrito";
  };
}

export default CartManager;
