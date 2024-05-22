"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const product_router_1 = require("./app/modules/product/product.router");
const order_router_1 = require("./app/modules/order/order.router");
const app = (0, express_1.default)();
//parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//application routers
app.use('/api/products', product_router_1.ProductRouter);
app.use('/api/orders', order_router_1.OrderRouter);
app.get('/', (req, res) => {
    res.send('Hello Developer World!');
});
app.get('*', (req, res) => {
    res.json({
        "success": false,
        "message": "Route not found"
    });
});
exports.default = app;
