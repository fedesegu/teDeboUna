import {Router} from 'express'
import { __dirname } from "../utils.js"
import { findProductById, findAllProduct, createOneProduc, deleteOneProdAll, updateProducts } from '../controllers/products.controller.js';
//import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get("/", findAllProduct)
router.get("/:pid", findProductById)
router.post("/", createOneProduc)
router.delete("/:pid", deleteOneProdAll)
router.put("/:pid", updateProducts)

export default router