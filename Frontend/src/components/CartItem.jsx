import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

const CartItem = ({ image, title, price, quantity = 1, onIncrement, onDecrement, onRemove }) => {
    return (
        <div className="flex items-center gap-4 border-b border-gray-100 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
            {/* Image */}
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-sm text-gray-900 line-clamp-2 pr-2 leading-tight">
                        {title}
                    </h4>
                    <span className="font-extrabold text-[#E53935] text-sm whitespace-nowrap">
                        ${price.toFixed(2)}
                    </span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onDecrement}
                        className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#E53935] hover:border-[#E53935] transition-colors"
                    >
                        <Minus className="w-3 h-3" />
                    </button>

                    <span className="font-bold text-sm text-gray-900 w-4 text-center">
                        {quantity}
                    </span>

                    {quantity < 10 ? (
                        <button
                            onClick={onIncrement}
                            className="w-6 h-6 rounded-full bg-[#E53935] flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-sm"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    ) : (
                        <button
                            onClick={onRemove}
                            className="w-6 h-6 rounded-full bg-[#E53935] flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-sm"
                        >
                            <Trash2 className="w-3 h-3" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartItem;
