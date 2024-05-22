import { Request, Response } from "express";
import productValidationSchema from "./product.validation";
import { ProductServices } from "./product.service";


const createProduct = async (req: Request, res: Response) => {
    try {

        const productData = req.body;

        // data validation using joi
        const {error, value} = productValidationSchema.validate(productData);

        const result = await ProductServices.createProductIntoDB(value);

        if(error){
            //send response
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error: error.details
            })
        }

        //send response
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result
        })

    } catch (error: any) {
        //send response
      res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong',
        error: error,
      });

    }
}

const getAllProducts = async (req: Request, res: Response) => {
    try {

        const searchItem = req.query.searchTerm as string;
        
        if(searchItem){
            try {
                const result = await ProductServices.searchProductIntoDB(searchItem)
                
                //send response
                res.status(200).json({
                    "success": true,
                    "message": `Products matching search term ${searchItem} fetched successfully!`,
                    "data": result
                })

            } catch (error: any) {
                //send response
                res.status(500).json({
                    success: false,
                    message: error.message || "Something Went Wrong",
                    error: error
                })
            }
        }
    
        const result = await ProductServices.getAllProductsFromDB();
  
        //send response
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result
        })

    } catch (error: any) {
        //send response
        res.status(500).json({
            success: false,
            message: error.message || "Something Went Wrong",
            error: error
        })
    }
}

const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;

        const result = await ProductServices.getSingleProductFromDB(productId);

        //response send
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: result
        })
    } catch (error: any) {
        //send response
    res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong',
        error: error,
      });
    }
}

const updateSingleProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const productData = req.body;

        const result = await ProductServices.updateSingleProductIntoDB(productId, productData);

        //res send
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result
        })
    } catch (error:any) {
        //res send
        res.status(500).json({
            success: false,
            message: error.message || "Something wend wrong",
            error: error
        })
    }
}

const deleteSingleProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;

         await ProductServices.deleteSingleProductFromDB(productId);

        //res send
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null
        })
    } catch (error: any) {
        //res send
        res.status(500).json({
            success: false,
            message: error.message || "Something wend wrong",
            error: error
        })
    }
}

export const ProductController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct
}