import mongoose from "mongoose"
import { CustomError } from "../service/errors/CustomError.js"
import { EError } from "../service/errors/enums.js"
import { generateCartError, generateProductError } from "../service/errors/info.js"
import { cartService } from "../service/index.js"
import { logger } from "../utils/logger.js"

class CartController {
    constructor(){
        this.cartService = cartService
    }

    getCart = async(req, res) => {
        try {
            const {cid} = req.params
            const result = await this.cartService.getCartById(cid)
            res.send({status:'success', payload: result})            
        } catch (error) {
            logger.error(error)
        }
    }

    createCart = async(req, res) => {
        try {
            const result = await this.cartService.addCart()
            res.send({status: 'success', payload: result})            
        } catch (error) {
            logger.error(error)
        }
    }

    addProductCart = async(req, res, next) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            if(!cid || !pid ) {
                CustomError.createError({
                    name: 'Error al obtener los params',
                    cause: generateCartError( {cid, pid}),
                    message: 'Los datos con incorrectos o nulos',
                    code: EError.INVALID_TYPES_ERROR
                })
            }
            const result = await this.cartService.addProduct(cid, pid, quantity);
            res.send({status: 'seccess', payload: result})            
        } catch (error) {
            next(error)
        }
    }

    updateCart =  async(req,res)=>{
        try {
            const { cid } = req.params;
            const { product, quantity } = req.body;
            const result = await this.cartService.updateTodoCart(cid, req.body);
            res.send({status:'success', payload: result})            
        } catch (error) {
            logger.error(error)
        }
    }

    updateProductCart = async(req,res)=>{
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const result = await this.cartService.updateCart(cid, pid, quantity);
            res.send({status:'success', payload: result})            
        } catch (error) {
            logger.error(error)
        }
    }

    deleteProductCart =async (req, res) =>{
        try {
            const { cid, pid } = req.params;
            const result = await this.cartService.deleteproduct(cid, pid);
            res.send({status:'success', payload: result})        
        } catch (error) {
            logger.error(error)
        }
    }

    deleteCart =  async (req, res) =>{
        try {
            const { cid } = req.params;
            const result = await this.cartService.deleteTodosLosProduct(cid);
            res.send({status:'success', payload: result})            
        } catch (error) {
            logger.error(error)
        }
    }
    buyCart = async(req, res)=>{
        logger.info(error)(req.user)
        try {
            const { cid } = req.params;
            const result = await this.cartService.buyCart(cid);
            res.send({status:'success', payload: result})
        } catch (error) {
            logger.error(error)(error)
        }
                    
    }   
}

export default CartController