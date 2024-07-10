import { Server } from "socket.io";
import MessageManager from "../daos/Dao/messageManager.js";
import ProductManager from "../daos/Dao/productManagerDB.js";
const messageManager = new MessageManager()
const productManager = new ProductManager()

export function configSocket(server) {
    const io = new Server(server);
    io.on('connection', socket => {
        console.log('usuario conectado');

        //escuchando los emits del producto
        socket.on('createProduct', async product => {
            const newProduct = await productManager.addProduct(product);

            io.emit('productCreated', newProduct);
        });

        socket.on('deleteProduct', async productId => {
            await productManager.deleteProduct(productId);
            io.emit('productDeleted', productId);
        });

        socket.on('updateProduct', async product => {
            const updatedProduct = await productManager.updateProduct(
                product.id,
                product
            );
            io.emit('productUpdated', updatedProduct);
        });

        socket.on('getProducts', async () => {
            const products = await productManager.getProducts();
            io.emit('products', products);
        });

        // Escuchando los mensajes del chat
        socket.on('newMessage', async message => {
            const newMessage = await messageManager.addMessage(message);
            io.emit('messageSend', newMessage);
        });

        socket.on('getMessages', async () => {
            const messages = await messageManager.getMessages();
            io.emit('messages', messages);
        });


        socket.on('disconnect', () => {
            console.log('usuario desconectado');
        });
    });
}