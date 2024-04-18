import { Router } from "express";
import { getHome, getRealTimeProducts } from "../controllers/productCtrls.js";
const ViewsRouter = Router();

ViewsRouter.get("/", getHome);
ViewsRouter.get("/realTimeProducts", getRealTimeProducts);

export default ViewsRouter;
