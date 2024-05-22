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
exports.OrderController = void 0;
const order_validation_1 = __importDefault(require("./order.validation"));
const order_service_1 = require("./order.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        //data validation using joi
        const { error, value } = order_validation_1.default.validate(orderData);
        const result = yield order_service_1.OrderServices.createOrderIntoDB(value);
        if (error) {
            //res send
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: error.details
            });
        }
        if (result === 5) {
            res.status(500).json({ "success": false,
                "message": "Something went wrong" });
        }
        else if (result === 2) {
            res.status(500).json({
                "success": false,
                "message": "Insufficient quantity available in inventory"
            });
        }
        else if (result === 3) {
            res.status(500).json({ "success": false,
                "message": "The ProductId not match with inventoryList" });
        }
        else {
            //res send
            res.status(200).json({
                "success": true,
                "message": "Order created successfully!",
                "data": result
            });
        }
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
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    try {
        let result;
        if (!email) {
            result = yield order_service_1.OrderServices.getOrdersFromDB();
        }
        else {
            result = yield order_service_1.OrderServices.getSingleOrderFromDB(email);
        }
        if (result == null) {
            res.status(500).json({
                "success": false,
                "message": "Order not found"
            });
        }
        // send response
        res.status(200).json({
            "success": true,
            "message": "Orders fetched successfully!",
            "data": result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: error,
        });
    }
});
const getSingleOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        const result = yield order_service_1.OrderServices.getSingleOrderFromDB(email);
        //response send
        res.status(200).json({
            "success": true,
            "message": "Orders fetched successfully for user email!",
            "data": result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: error,
        });
    }
});
exports.OrderController = {
    createOrder,
    getAllOrders,
    getSingleOrder
};
