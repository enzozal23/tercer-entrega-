import { Schema, model } from "mongoose"
import crypto from "crypto"

const ticketsCollection = 'tickets'

const ticketsSchema = new Schema({
    code: {
        type: String,
        default: () => crypto.random.UUID().toString()
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: Number, //total de la compra
    purchaser: String //mail
})

export const ticketModel = model(ticketsCollection, ticketsSchema)