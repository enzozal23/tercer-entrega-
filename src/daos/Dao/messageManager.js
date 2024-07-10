import Message from '../models/chatModels.js';

class MessageManager {
    async getMessages() {
        return await Message.find().lean();
    }

    async addMessage(message) {
        const newMessage = new Message(message);
        await newMessage.save();
        return newMessage;
    }

    async deleteMessage(id) {
        await Message.findByIdAndDelete(id);
    }

    async deleteAllMessages() {
        await Message.deleteMany({});
    }

} export default MessageManager