import { Tproduct } from "./product.interface";
import { ProductModel } from "./product.model";


const createProductIntoDB = async (productData: Tproduct) => {

    const result = await ProductModel.create(productData);

    return result;
} 

const getAllProductsFromDB = async () => {
    const result = await ProductModel.find();
    return result
}

const getSingleProductFromDB = async (id: string) => {
    const result = await ProductModel.findOne({_id: id})
    return result;
}

const updateSingleProductIntoDB = async (id: string, productData: Tproduct) => {
    const result = await ProductModel.findByIdAndUpdate({_id: id}, productData, {new: true})
    return result;
}

const searchProductIntoDB = async (searchTerm: string) => {
    const regex = new RegExp(searchTerm, 'i'); // 'i' use for case-insensitive
    const result = await ProductModel.find({
        $or: [
            { name: regex },
            { description: regex },
            { category: regex },
            { tags: regex }
        ]
    });

    return result;

}

const deleteSingleProductFromDB = async (id:string) => {
    const result = await ProductModel.deleteOne({_id: id}, {isDeleted: true});
    return result;
}


export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateSingleProductIntoDB,
    searchProductIntoDB,
    deleteSingleProductFromDB
}