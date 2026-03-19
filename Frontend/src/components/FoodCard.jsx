import React from 'react';
import { ShoppingCart } from 'lucide-react';

const FoodCard = ({ item, onAddToCart }) => {
    const { image, name: title, price, description } = item;
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
            {/* Image */}
            <div className="h-48 w-full overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-900 leading-tight pr-4">{title}</h3>
                    <span className="font-extrabold text-xl text-[#E53935] whitespace-nowrap">${price.toFixed(2)}</span>
                </div>

                <p className="text-gray-500 text-sm flex-1 leading-relaxed mb-6">
                    {description}
                </p>

                {/* Action Button */}
                <button 
                    onClick={() => onAddToCart(item)}
                    className="w-full bg-[#E53935] hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
                >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    );
};

export default FoodCard;
