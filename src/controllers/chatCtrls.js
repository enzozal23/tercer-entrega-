

import MessageManager from '../daos/Dao/messageManager.js';

const messageManager = new MessageManager();

export const getChat = async (req, res) => {
    const messages = await messageManager.getMessages();
    res.render('chat', { messages });
};

export const postMessage = async (req, res) => {
    const message = req.body;
    if (!message.user || !message.message) {
        return res.status(400).json({
            status: 'error',
            error: 'Datos de mensaje incompletos',
        });
    }
    const newMessage = await messageManager.addMessage(message);
    res.status(201).send(newMessage);
};

