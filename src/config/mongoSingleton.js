import {connect} from 'mongoose'

export class MongoSingleton{
    static #instance
    constructor(url){
        connect(url)
        
    }
    
    static getInstance(url){
        if(this.#instance){
            console.log('Ya existe una instancia de la base de datos');
            return this.#instance
        }
        this.#instance = new MongoSingleton(url)
        console.log('Se creo una instancia de la base de datos');
        return this.#instance
    }
}