import { Request, Response } from "express";
import orderValidationSchema from "./order.validation";
import { OrderServices } from "./order.service";



const createOrder = async (req: Request, res: Response) => {
    try {
        const orderData = req.body;

        //data validation using joi
        const {error, value} = orderValidationSchema.validate(orderData);

        const result = await OrderServices.createOrderIntoDB(value);

        if(error){
            //res send
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: error.details  
            })
        }
        
        if(result === 5){
            res.status(500).json({"success": false,
                "message": "Something went wrong"})
        }
        else if(result === 2){
            res.status(500).json({
                "success": false,
                "message": "Insufficient quantity available in inventory"
            })
        }
        else if(result === 3){
            res.status(500).json({"success": false,
            "message": "The ProductId not match with inventoryList"})
        }
        else{
        //res send
        res.status(200).json({
            "success": true,
            "message": "Order created successfully!",
            "data": result
        })
    }
    } catch (error: any) {
        //send response
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: error,
        });
    }
}


const getAllOrders = async(req: Request, res: Response) => {

    const {email} = req.query;
    try {
        let result;

        if(!email){
            result = await OrderServices.getOrdersFromDB();
        }
        else{
            result = await OrderServices.getSingleOrderFromDB(email)
        }
        
         
        if(result == null){
            res.status(500).json({
                "success": false,
                "message": "Order not found"
               })
        }
        // send response
        res.status(200).json({
            "success": true,
            "message": "Orders fetched successfully!",
            "data": result
        })
        
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: error,
        });
    }
}

const getSingleOrder = async (req: Request, res: Response) => {
    try {
        const {email} = req.query;
        
        const result = await OrderServices.getSingleOrderFromDB(email);

        //response send
        res.status(200).json({
            "success": true,
            "message": "Orders fetched successfully for user email!",
            "data": result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: error,
        });
    }
}

export const OrderController = {
    createOrder,
    getAllOrders,
    getSingleOrder
}