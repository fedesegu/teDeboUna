import { cartsManager } from "../DAL/daos/mongoDB/cartsManagerDB.js"

export const findAll = () => {
    const carts = cartsManager.findAll();
    return carts;
};

export const findCById = (id) => {
    const cart = cartsManager.findCById(id)        
    return cart;
};


export const createOne = (obj) => {
    const createdCart = cartsManager.createOne(obj);
    return createdCart;
};

export const addProduct = (cid,pid) => {
    const cartModific = cartsManager.addProductToCart(cid,pid);
    return cartModific;
};

export const deleteOneProduct = (cid,pid) => {
    const cartModific = cartsManager.deleteOne(cid,pid);
    return cartModific;
};

export const deleteAll = (cid) => {
    const listaCarts = cartsManager.deleteAll(cid);
    return listaCarts;
};

export const updateCart = (cid, pid, quantity) => {
    const cartsModific = cartsManager.update(cid, pid, quantity);
    return cartsModific;
};