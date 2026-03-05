import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, unique: true },
    customerName: { type: String, required: true },
    tableNumber: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
            quantity: { type: Number, required: true, default: 1 },
        },
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["pending", "preparing", "ready"], default: "pending" },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);