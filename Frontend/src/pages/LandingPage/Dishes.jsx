import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dishes = () => {
    const [activeTab, setActiveTab] = useState('All Selections');

    const tabs = ['All Selections', 'Handmade Pasta', 'Premium Steaks', 'Fresh Seafood', 'Desserts'];

    const dishes = [
        {
            title: "Truffle Mushroom Pasta",
            price: "$32",
            rating: "4.9",
            image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=600",
            description: "Creamy wild mushroom blend infused with black truffle oil and aged parmesan."
        },
        {
            title: "Signature Wagyu Steak",
            price: "$65",
            rating: "4.8",
            image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=600",
            description: "Grade A5 Wagyu beef seared to perfection with garlic herb butter and sea salt."
        },
        {
            title: "Atlantic Scallops",
            price: "$42",
            rating: "4.9",
            image: "https://images.unsplash.com/photo-1626082895617-2c6ad3dfdfd8?q=80&w=600",
            description: "Pan-seared jumbo scallops served over sweet pea purée and crispy pancetta."
        }
    ];

    return (
        <section className="container mx-auto px-4 py-24">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div>
                    <span className="text-primary font-bold text-sm tracking-widest uppercase mb-2 block">Fresh & Exclusive</span>
                    <h2 className="text-4xl font-bold mb-4">Popular Dishes</h2>
                    <p className="text-gray-600 max-w-xl">
                        Hand-picked favorites from our kitchen, prepared with the finest seasonal ingredients by our master chefs.
                    </p>
                </div>
                <Link to="/menu" className="text-primary font-semibold hover:text-red-700 mt-4 md:mt-0 flex items-center gap-2">
                    View All <i className="fa-solid fa-arrow-right"></i>
                </Link>
            </div>

            <div className="flex flex-wrap gap-4 mb-12 border-b border-gray-200 pb-4">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`font-medium pb-4 px-2 -mb-[17px] transition-colors ${activeTab === tab
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dishes.map((dish, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 overflow-hidden group">
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={dish.image}
                                alt={dish.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-4 right-4 bg-white text-gray-900 font-bold px-3 py-1 rounded-full shadow-md text-sm">
                                {dish.price}
                            </span>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold">{dish.title}</h3>
                                <div className="flex items-center gap-1 text-sm bg-yellow-50 text-yellow-600 px-2 py-1 rounded">
                                    <i className="fa-solid fa-star text-xs"></i> {dish.rating}
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                                {dish.description}
                            </p>
                            <div className="flex items-center gap-4">
                                <Link to="/cart" className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors text-center">
                                    Add to Order
                                </Link>
                                <button className="w-12 h-12 bg-red-50 text-primary rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                    <i className="fa-regular fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center mt-12 gap-6">
                <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors">
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mb-1"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-300 mb-1"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-300 mb-1"></span>
                </div>
                <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors">
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </section>
    );
};

export default Dishes;
