import CartManager from '../dao/cartManajerDB.js';

const cartManager = new CartManager();

export const createCart = async (req, res) => {
    try {
        const cart = await cartManager.createCart();
        res.status(201).json({
            status: 'success',
            message: 'Carrito creado correctamente',
            payload: cart,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: 'Error al crear el carrito',
        });
    }
};

export const getCartById = async (req, res) => {
    const cid = parseInt(req.params.cid);
    const cart = await cartManager.getCartById(cid);
    if (!cart) {
        return res.status(404).json({
            status: 'error',
            error: 'Carrito no encontrado',
        });
    }
    res.json({ cart });
};

export const addProductToCart = async (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    try {
        const cart = await cartManager.addToCart(cid, pid);
        if (!cart) {
            return res.status(404).json({
                status: 'error',
                error: 'Producto no encontrado',
            });
        }
        res.json({ cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            error: 'Error al agregar producto al carrito',
        });
    }
};

export const removeProductFromCart = async (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    if (isNaN(cid) || isNaN(pid)) {
        return res.status(400).json({
            status: 'error',
            error: 'ID del carrito y del producto deben ser números',
        });
    }

    try {
        const cart = await cartManager.removeProductFromCart(cid, pid);
        if (!cart) {
            return res.status(404).json({
                status: 'error',
                error: 'No se pudo eliminar el producto del carrito',
            });
        }
        res.json({ cart });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: 'Error al eliminar producto del carrito',
        });
    }
};

export const deleteCart = async (req, res) => {
    const cid = parseInt(req.params.cid);
    const cart = await cartManager.deleteCart(cid);
    if (!cart) {
        return res.status(404).json({
            status: 'error',
            error: 'No se pudo eliminar el carrito',
        });
    }
    res.json({ cart });
};