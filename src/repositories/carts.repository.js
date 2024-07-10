export default class CartRepository{
    constructor(cartDao){
        this.cartDao = cartDao
    }
    getCartById = async cid => await this.cartDao.getCartById(cid)
    addCart = async () => await this.cartDao.addCart()
    addProduct = async(cid, pid, quantity) => await this.cartDao.addProduct(cid, pid, quantity)
    updateCart = async (cid, product, quantity) => await this.cartDao.updateCart(cid, product, quantity)
    updateTodoCart = async (cid, products)  => await this.cartDao.updateTodoCart(cid, products)
    deleteProduct = async(cid, pid) => await this.cartDao.deleteProduct(cid, pid)
    deleteTodosLosProduct = async(cid) => await this.cartDao.deleteTodosLosProduct(cid)
    buyCart = async(cid) => await this.cartDao.buyCart(cid)
}