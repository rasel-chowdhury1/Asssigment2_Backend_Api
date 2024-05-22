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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const createOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = orderData.productId;
    const findProduct = yield product_model_1.ProductModel.findOne({ _id: productId });
    if (findProduct) {
        if (findProduct.inventory.quantity >= orderData.quantity) {
            try {
                const value = findProduct.inventory.quantity - orderData.quantity;
                if (value) {
                    yield product_model_1.ProductModel.findByIdAndUpdate({ _id: productId }, { $set: { 'inventory.quantity': value } });
                }
                else {
                    yield product_model_1.ProductModel.findByIdAndUpdate({ _id: productId }, { $set: { 'inventory.quantity': value, 'inventory.inStock': false } });
                }
                const result = yield order_model_1.OrderModel.create(orderData);
                return result;
            }
            catch (error) {
                return 5;
            }
        }
        else {
            return 2;
        }
    }
    else {
        //res send
        return 3;
    }
});
const getOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.find();
    return result;
});
const getSingleOrderFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.findOne({ email });
    return result;
});
exports.OrderServices = {
    createOrderIntoDB,
    getOrdersFromDB,
    getSingleOrderFromDB
};
