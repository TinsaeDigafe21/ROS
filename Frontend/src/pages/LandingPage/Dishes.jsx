import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMenuItems } from '../../api/menuApi';

const Dishes = () => {
    const [activeTab, setActiveTab] = useState('All Selections');
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const fetchMenu = async () => {
            try {
                setLoading(true);
                const items = await getMenuItems();
                if (!isMounted) return;
                setMenuItems(items);
                setError(null);
            } catch (err) {
                if (!isMounted) return;
                setError(err.message || 'Failed to load menu items.');
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchMenu();
        return () => {
            isMounted = false;
        };
    }, []);

    const categories = Array.from(new Set(menuItems.map(item => item.category).filter(Boolean)));
    const tabs = ['All Selections', ...categories];

    useEffect(() => {
        if (activeTab !== 'All Selections' && categories.length > 0 && !categories.includes(activeTab)) {
            setActiveTab('All Selections');
        }
    }, [activeTab, categories]);

    const filteredItems = menuItems.filter((item) => {
        const matchesCategory = activeTab === 'All Selections' || item.category === activeTab;
        const isAvailable = item.isAvailable !== false;
        return matchesCategory && isAvailable;
    });

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

            {error && (
                <p className="text-red-600 text-sm mb-6">{error}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading && (
                    <div className="col-span-full text-center text-gray-500">
                        Loading menu items...
                    </div>
                )}
                {!loading && filteredItems.length === 0 && (
                    <div className="col-span-full text-center text-gray-500">
                        No menu items available.
                    </div>
                )}
                {!loading && filteredItems.map((item) => (
                    <div key={item._id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 overflow-hidden group">
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={item.image ? `http://localhost:5000/${item.image}` : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop'}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-4 right-4 bg-white text-gray-900 font-bold px-3 py-1 rounded-full shadow-md text-sm">
                                Br {item.price.toFixed(2)}
                            </span>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold">{item.name}</h3>
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                    {item.category}
                                </span>
                            </div>
                            <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                                {item.description || 'No description available.'}
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
