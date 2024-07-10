import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  user: { type: String, required: true },
  message: String,
});

const Message = model('Message', messageSchema);

export default Message;