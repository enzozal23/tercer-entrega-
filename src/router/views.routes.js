import { Router } from "express";
import { getRealTimeProducts, getProductById, getProducts } from "../controllers/productCtrls.js";
import { getChat } from "../controllers/chatCtrls.js";
import { getCartById } from "../controllers/cartCtrls.js"
const ViewsRouter = Router();

ViewsRouter.get("/products", getProducts);
ViewsRouter.get("/realTimeProducts", getRealTimeProducts);
ViewsRouter.get('/products/:id', getProductById)
ViewsRouter.get('/chat', getChat)
ViewsRouter.get('/cart:cid', getCartById)
ViewsRouter.get('/login', (req, res) => {
    res.render('login')
})
ViewsRouter.get('/register', (req, res) => {
    res.render('register')
})
export default ViewsRouter;
