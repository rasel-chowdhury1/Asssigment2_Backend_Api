import express from "express";
import { ProductController } from "./product.controller";


const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getSingleProduct);

router.post('/', ProductController.createProduct);
router.put('/:id', ProductController.updateSingleProduct);

router.delete('/:id', ProductController.deleteSingleProduct);

export const ProductRouter = router;