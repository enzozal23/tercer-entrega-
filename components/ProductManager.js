import { promises as fs } from "fs";

export default class ProductManager {
  constructor() {
    this.path = "./productos.txt";
    this.products = [];
  }
  static id = 0;

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    ProductManager.id++;

    let newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: ProductManager.id,
    };

    this.products.push(newProduct);

    await fs.writeFile(this.path, JSON.stringify(this.products));
  };

  //Leer productos
  readProducts = async () => {
    let respuesta = await fs.readFile(this.path, "utf-8");
    return JSON.parse(respuesta);
  };
  //Mostrar productos
  getProducts = async () => {
    let respuesta2 = await this.readProducts();
    return console.log(respuesta2);
  };
  //Obtener un producto por id
  getProductsById = async (id) => {
    let respuesta3 = await this.readProducts();
    if (!respuesta3.find((product) => product.id === id)) {
      console.log("Producto no encontrado");
    } else {
      console.log(respuesta3.find((product) => product.id === id));
    }
  };
  //Borrar un producto por ID
  deleteProductById = async (id) => {
    let respuesta3 = await this.readProducts();
    let productFilter = respuesta3.filter((products) => products.id != id);
    await fs.writeFile(this.path, JSON.stringify(productFilter));
  };

  //Actualizar un producto
  updateProducts = async ({ id, ...producto }) => {
    //Recibimos un producto y sacamos el id con los otros atributos
    await this.deleteProductById(id); //Usamos el id para borrar el producto por su id
    let productOld = await this.readProducts(); //llamamos para que nos devuelva lo que quedó
    let productEdit = [{ ...producto, id }, ...productOld]; //Generamos un nuevo array donde nos queda los productos restantes+ el producto actualizado
    await fs.writeFile(this.path, JSON.stringify(productEdit));
  };
}

const productos = new ProductManager();

productos.addProduct(
  "Titulo1",
  "Description1",
  1999,
  "Thumbnail1",
  "code",
  "stock"
);
productos.addProduct(
  "Titulo2",
  "Description2",
  1992,
  "Thumbnail2",
  "code2",
  "stock2"
);
productos.addProduct(
  "Titulo3",
  "Description3",
  3000,
  "Thumbnail3",
  "code3",
  "stock3"
);
productos.addProduct(
  "Titulo4",
  "Description4",
  4992,
  "Thumbnail4",
  "code4",
  "stock4"
);
productos.addProduct(
  "Titulo5",
  "Description5",
  3992,
  "Thumbnail5",
  "code5",
  "stock5"
);
productos.addProduct(
  "Titulo6",
  "Description6",
  1992,
  "Thumbnail6",
  "code6",
  "stock6"
);
productos.addProduct(
  "Titulo7",
  "Description7",
  5992,
  "Thumbnail7",
  "code7",
  "stock7"
);
productos.addProduct(
  "Titulo8",
  "Description8",
  6992,
  "Thumbnail8",
  "code8",
  "stock8"
);
productos.addProduct(
  "Titulo9",
  "Description9",
  8992,
  "Thumbnail9",
  "code9",
  "stock9"
);

productos.getProducts();

productos.getProductsById(2);

productos.deleteProductById(2);

productos.updateProducts({
  title: "Titulo2",
  description: "Description2",
  price: 4500,
  thumbnail: "Thumbnail2",
  code: "code2",
  stock: "stock2",
  id: 2,
});
