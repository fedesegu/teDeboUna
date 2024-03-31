import { productsManager } from "../DAL/daos/mongoDB/productManagerDB.js";
import { usersManager } from "../DAL/daos/mongoDB/usersManagerDB.js";
import CustomError from "../errors/error.generate.js";
import { ErrorMessages, ErrorName } from "../errors/errors.enum.js";
//import { jwtValidation } from "../middlewares/jwt.middleware.js";
import { findAll, findById, createOne, deleteOneProduct, updateProduct } from "../services/product.service.js";
//import { transporter } from "../utils/nodemailer";

export const findProductById = async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await findById(pid);
        if (!product) {
            return CustomError.generateError(ErrorMessages.PRODUCT_NOT_FOUND,404, ErrorName.PRODUCT_NOT_FOUND);
        }
        res.status(200).json({ message: "Product found", product });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
};

export const findAllProduct = async (req, res) => {
    try {
        const products = await findAll(req.query); 
        res.status(200).json({ message: "Product found", products });   
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createOneProduc = async (req, res) => {
    const { title, description, price, code, stock, category } = req.body;

    if (!title || !description || !price || !code || !stock || ! category) {
        return CustomError.generateError(ErrorMessages.ALL_FIELDS_REQUIRED,400,ErrorName.ALL_FIELDS_REQUIRED);
    }
  
    try {
        const existingProduct = await productsManager.findByCode(code);
        if (existingProduct.length >= 1) {
            res.status(500).json({ message: error.message });
        }
        if (req.user.role === "premium") {
            const newProduct = {...req.body, owner:req.user.mail};
            const response = await createOne(newProduct);
            res.status(200).json({ message: "Product created", response });

        } else {
            const response = await createOne(req.body);
            res.status(200).json({ message: "Product created", response });

        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteOneProdAll = async (req, res) => {
    const { id } = req.body;
    const producForDelete = await findById(id);
    const user = await usersManager.findByEmail(producForDelete.owner);
    
    try {
        if (req.user.role === "premium") {
            if (producForDelete.owner === user.email) {
                const response = await deleteOneProduct(id);
                if (!response) {
                    return res.status(404).json({ message: "Product not found" });
                }
                return res.status(200).json({ message: "Product deleted" });
            } else {
                return res.status(500).json({ message: "This product was not created by you" });
            }
        } else {
            const response = await deleteOneProduct(id);
            await transporter.sendMail({
                from: "federicosegu@gmail.com",
                to: user.email,
                subject: "Producto Eliminado en Almacen Don Carlos",
                html: `<b>Su producto ${producForDelete.title}, ha sido eliminado de nuestra pagina. </b>`,
            });
            if (!response) {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.status(200).json({ message: "Product deleted" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server internal error" });
    }
};


export const updateProducts = async (req, res) => {
    const { _id } = req.body;
    try {
        const response = await updateProduct(_id, req.body);
        if (!response) {
            return CustomError.generateError(ErrorMessages.PRODUCT_NOT_FOUND,404, ErrorName.PRODUCT_NOT_FOUND);
        }
        res.status(200).json({ message: "Product updated", response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}