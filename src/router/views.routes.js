import { Router } from "express";
import { getHome, getRealTimeProducts } from "../controllers/productCtrls.js";
import { getChat } from "../controllers/chatCtrls.js";
const ViewsRouter = Router();

ViewsRouter.get("/", getHome);
ViewsRouter.get("/realTimeProducts", getRealTimeProducts);
ViewsRouter.get('/chat', getChat)

export default ViewsRouter;
