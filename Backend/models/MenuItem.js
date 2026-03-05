import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String, trim: true },
    image: { type: String, },
    category: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("MenuItem", menuItemSchema);