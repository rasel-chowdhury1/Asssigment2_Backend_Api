import { Schema, model } from "mongoose";
import { Tinvertory, Tproduct, Tvariants } from "./product.interface";


const variantsSchema = new Schema<Tvariants>({
    type: {type: String, required: true},
    value: {type: String, required: true}
})

const inventorySchema = new Schema<Tinvertory>({
    quantity: {type: Number, required: true},
    inStock: {type: Boolean, required: true}
})

const productSchema = new Schema<Tproduct>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    tags: {type: [String], required: true},
    variants: {type: [variantsSchema], required: true},
    inventory: {type: inventorySchema, required: true}
})


export const ProductModel = model<Tproduct>("Product", productSchema );