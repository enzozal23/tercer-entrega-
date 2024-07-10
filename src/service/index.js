import CartMongoDao from "../daos/Dao/cartManajerDB.js";
import ProductMongoDao from "../daos/Dao/productManagerDB.js";
import { UsersManagerMongo } from "../daos/Dao/userManagerDB.js";
import ProductRepository from "../repositories/product.repository.js";
import UserRepository from "../repositories/user.repository.js";
import CartRepository from "../repositories/carts.repository.js";
import TicketRepository from "../repositories/ticket.repository.js";
import { TicketDao } from "../daos/Dao/ticketManagerDB.js";

export const userService = new UserRepository(new UsersManagerMongo())
export const productService = new ProductRepository(new ProductMongoDao())
export const cartService = new CartRepository(new CartMongoDao())
export const ticketService = new TicketRepository(new TicketDao())