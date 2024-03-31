import { Router } from 'express';
import { findCartById, findAllCart, addProductCart, createOneCart, cartBuy, deleteOneProdCart, deleteOneCartAll, updateCartQuantity } from '../controllers/cart.controller.js';
//import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get("/", findAllCart)
router.post("/",  createOneCart)
router.get("/:cid", findCartById)
router.get("/:cid/purchase", cartBuy)
router.put("/:cid/products/:pid", updateCartQuantity)
router.post("/:cid/products/:pid", addProductCart)
router.delete("/:cid/products/:pid", deleteOneProdCart)
router.delete("/:cid", deleteOneCartAll)

export default router;