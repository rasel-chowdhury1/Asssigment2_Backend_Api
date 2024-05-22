"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_validation_1 = __importDefault(require("./product.validation"));
const product_service_1 = require("./product.service");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        // data validation using joi
        const { error, value } = product_validation_1.default.validate(productData);
        const result = yield product_service_1.ProductServices.createProductIntoDB(value);
        if (error) {
            //send response
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error: error.details
            });
        }
        //send response
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result
        });
    }
    catch (error) {
        //send response
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: error,
        });
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchItem = req.query.searchTerm;
        if (searchItem) {
            try {
                const result = yield product_service_1.ProductServices.searchProductIntoDB(searchItem);
                //send response
                res.status(200).json({
                    "success": true,
                    "message": `Products matching search term ${searchItem} fetched successfully!`,
                    "data": result
                });
            }
            catch (error) {
                //send response
                res.status(500).json({
                    success: false,
                    message: error.message || "Something Went Wrong",
                    error: error
                });
            }
        }
        const result = yield product_service_1.ProductServices.getAllProductsFromDB();
        //send response
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result
        });
    }
    catch (error) {
        //send response
        res.status(500).json({
            success: false,
            message: error.message || "Something Went Wrong",
            error: error
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const result = yield product_service_1.ProductServices.getSingleProductFromDB(productId);
        //response send
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: result
        });
    }
    catch (error) {
        //send response
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: error,
        });
    }
});
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const productData = req.body;
        const result = yield product_service_1.ProductServices.updateSingleProductIntoDB(productId, productData);
        //res send
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result
        });
    }
    catch (error) {
        //res send
        res.status(500).json({
            success: false,
            message: error.message || "Something wend wrong",
            error: error
        });
    }
});
const deleteSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        yield product_service_1.ProductServices.deleteSingleProductFromDB(productId);
        //res send
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null
        });
    }
    catch (error) {
        //res send
        res.status(500).json({
            success: false,
            message: error.message || "Something wend wrong",
            error: error
        });
    }
});
exports.ProductController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct
};
