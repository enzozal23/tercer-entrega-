export const generateUserError = (user) =>{
    return `Hay una de las propiedades del usuario incompleta o invalida.
    listado de propiedades requeridas:
    *first_name : necesita ser un string, pero se recibio ${user.first_name}
    *last_name : necesita ser un string, pero se recibio ${user.last_name}
    *email : necesita ser un string, pero se recibio ${user.email}
    `
}
export const generateProductError = (product) =>{
    return `Hay una de las propiedades del producto incompleta o invalida.
    listado de propiedades requeridas:
    *title : necesita ser un string, pero se recibio ${product.title}
    *description : necesita ser un string, pero se recibio ${product.description}
    *price : necesita ser un number, pero se recibio ${product.price}
    *code : necesita ser un string, pero se recibio ${product.code}
    *stock : necesita ser un number, pero se recibio ${product.stock}
    *category : necesita ser un string, pero se recibio ${product.category}
    `
}
export const generateCartError = ({cid, pid}) =>{
    return `Hay una de las propiedades del carrito incompleta o invalida.
    listado de propiedades requeridas:
    *cid : necesita ser un string, pero se recibio ${cid}
    *pid : necesita ser un string, pero se recibio ${pid}
    `
}