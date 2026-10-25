const mongoose = require("mongoose");
const product = require("./product");
const OrderSchema = new mongoose.Schema(
    {
        user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
        products:[{product:object,qty:Number}],
        total:Number,
        staus:{type:String,default:'Pendng'},
    },
    { timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);