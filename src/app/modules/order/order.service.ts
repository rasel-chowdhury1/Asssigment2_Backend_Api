import { ProductModel } from "../product/product.model";
import { Torder } from "./order.interface";
import { OrderModel } from "./order.model";


const createOrderIntoDB = async (orderData: Torder ) => {
    const productId = orderData.productId;
    const findProduct = await ProductModel.findOne({_id: productId});

    if(findProduct){
        if(findProduct.inventory.quantity >= orderData.quantity){
            try {
                const value = findProduct.inventory.quantity - orderData.quantity;
                if(value){
                    await ProductModel.findByIdAndUpdate({_id: productId}, { $set: { 'inventory.quantity': value }  }); 
                }
                else{
                    await ProductModel.findByIdAndUpdate({_id: productId}, { $set: { 'inventory.quantity': value, 'inventory.inStock': false }  });
                }
                 
                const result = await OrderModel.create(orderData);
                return result;

            } catch (error) {
                return 5;
            }
        }
        else{
            return 2
        }
    
    }
    else{
        //res send
        return 3;
    }
    
}

const getOrdersFromDB = async () => {

    const result = await OrderModel.find()
    return result
}

const getSingleOrderFromDB = async (email:any) => {
    const result = await OrderModel.findOne({email});
    return result;
}

export const OrderServices = {
    createOrderIntoDB,
    getOrdersFromDB,
    getSingleOrderFromDB
}