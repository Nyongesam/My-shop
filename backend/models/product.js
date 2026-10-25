const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
    {
        name: string,
        description: string,
        price: number,
        image: string,
        category:String,
        stock:{type:Number, default:100}
    },
    { timestamps: true }
);

module.exports=mongoose.model("Product",ProductSchema);
