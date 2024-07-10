import { cartService } from "../service/index.js"

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
            console.log(error)
        }
    }

    createCart = async(req, res) => {
        try {
            const result = await this.cartService.addCart()
            res.send({status: 'seccess', payload: result})            
        } catch (error) {
            console.log(error)
        }
    }

    addProductCart = async(req, res) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const result = await this.cartService.addProduct(cid, pid, quantity);
            res.send({status: 'seccess', payload: result})            
        } catch (error) {
            console.log(error)
        }
    }

    updateCart =  async(req,res)=>{
        try {
            const { cid } = req.params;
            const { product, quantity } = req.body;
            const result = await this.cartService.updateTodoCart(cid, req.body);
            res.send({status:'success', payload: result})            
        } catch (error) {
            console.log(error)
        }
    }

    updateProductCart = async(req,res)=>{
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const result = await this.cartService.updateCart(cid, pid, quantity);
            res.send({status:'success', payload: result})            
        } catch (error) {
            console.log(error)
        }
    }

    deleteProductCart =async (req, res) =>{
        try {
            const { cid, pid } = req.params;
            const result = await this.cartService.deleteproduct(cid, pid);
            res.send({status:'success', payload: result})        
        } catch (error) {
            console.log(error)
        }
    }

    deleteCart =  async (req, res) =>{
        try {
            const { cid } = req.params;
            const result = await this.cartService.deleteTodosLosProduct(cid);
            res.send({status:'success', payload: result})            
        } catch (error) {
            console.log(error)
        }
    }
    buyCart = async(req, res)=>{
        console.log(req.user)
        try {
            const { cid } = req.params;
            const result = await this.cartService.buyCart(cid);
            res.send({status:'success', payload: result})
        } catch (error) {
            console.log(error)
        }
                    
    }   
}

export default CartController