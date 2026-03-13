import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FoodCard from '../../components/FoodCard';
import CartItem from '../../components/CartItem';
import { SlidersHorizontal, Phone, MapPin, ChevronRight, Loader2 } from 'lucide-react';
import { getCategories } from '../../api/categoryApi';

const UserDashboard = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const cats = await getCategories();
            setCategories(cats);
            if (cats.length > 0) {
                setActiveCategory(cats[0].name);
            }
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const foodItems = [
        {
            id: 1,
            title: 'Heirloom Tomato Salad',
            price: 16.00,
            description: 'Burrata cheese, balsamic glaze, fresh basil, and extra virgin olive oil.',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
        },
        {
            id: 2,
            title: 'Chili Garlic Prawns',
            price: 22.00,
            description: 'Jumbo prawns sautéed in a spicy garlic butter sauce with sourdough.',
            image: 'https://images.unsplash.com/photo-1559742811-822873691fc8?q=80&w=800&auto=format&fit=crop',
        }
    ];

    const cartItems = [
        {
            id: 1,
            title: 'Truffle Tagliatelle',
            price: 28.00,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=800&auto=format&fit=crop',
        },
        {
            id: 2,
            title: 'Wild Salmon',
            price: 34.00,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800&auto=format&fit=crop',
        }
    ];

    const subtotal = 62.00;
    const deliveryFee = 0; // FREE
    const total = subtotal + deliveryFee;

    return (
        <div className="min-h-screen flex flex-col bg-[#F9FAFB] font-sans">
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT COLUMN: Main Dashboard Content */}
                <div className="lg:col-span-8 flex flex-col gap-10">

                    {/* HERO SECTION */}
                    <div className="bg-[#FFF4F2] rounded-3xl p-10 relative overflow-hidden">
                        <div className="relative z-10 max-w-lg">
                            <span className="inline-block px-3 py-1 bg-red-100 text-[#E53935] text-xs font-extrabold tracking-wider rounded-full mb-6 max-w-max">
                                PREMIUM DINING
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.15] mb-4 tracking-tight">
                                Experience Culinary <br /> Excellence at Your <br />
                                <span className="text-[#E53935]">Doorstep</span>
                            </h1>
                            <p className="text-gray-600 text-base md:text-lg mb-8 max-w-md font-medium leading-relaxed">
                                Chef-crafted meals prepared with seasonal ingredients and delivered with white-glove service.
                            </p>

                            <div className="flex gap-4">
                                <button className="bg-[#E53935] hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95">
                                    Explore Menu
                                </button>
                                <button className="bg-white text-[#E53935] font-bold py-3 px-6 rounded-xl hover:bg-red-50 transition-all shadow-sm active:scale-95">
                                    Special Offers
                                </button>
                            </div>
                        </div>

                        {/* Optional decorative background elements can go here */}
                        {/* <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ffe0dc] to-transparent mix-blend-multiply rounded-r-3xl"></div> */}
                    </div>

                    {/* CATEGORIES SECTION */}
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Browse Our Categories</h2>
                            <button className="w-10 h-10 rounded-full bg-[#FFF4F2] text-[#E53935] flex justify-center items-center hover:bg-red-100 transition-colors">
                                <SlidersHorizontal className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Category Tabs */}
                        <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
                            {loading ? (
                                <div className="flex justify-center items-center py-4">
                                    <Loader2 className="w-5 h-5 animate-spin text-[#E53935]" />
                                </div>
                            ) : (
                                categories.map((cat) => (
                                    <button
                                        key={cat._id}
                                        onClick={() => setActiveCategory(cat.name)}
                                        className={`pb-4 text-sm font-bold whitespace-nowrap transition-all border-b-2 
                        ${activeCategory === cat.name
                                                ? 'border-[#E53935] text-[#E53935]'
                                                : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))
                            )}
                            ))}
                        </div>

                        {/* FOOD GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {foodItems.map(item => (
                                <FoodCard
                                    key={item.id}
                                    title={item.title}
                                    price={item.price}
                                    description={item.description}
                                    image={item.image}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Sidebar */}
                <div className="lg:col-span-4 flex flex-col gap-6">

                    {/* Current Order Status Card */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-[#E53935]">
                                {/* Delivery Truck Icon could go here. Let's use a standard box icon or something. */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                            </div>
                            <h3 className="font-extrabold text-lg text-gray-900 tracking-tight">Current Order Status</h3>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-extrabold text-[#E53935] tracking-widest uppercase">Preparing</span>
                                <span className="text-xs font-bold text-gray-500">Est. 25 mins</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-1.5 w-full bg-gray-200 rounded-full mb-4 overflow-hidden relative">
                                <div className="absolute top-0 left-0 bg-[#E53935] h-full w-2/5 rounded-full"></div>
                            </div>

                            {/* Delivery Partner */}
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-orange-200 overflow-hidden border-2 border-white shadow-sm">
                                        <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Marco&backgroundColor=ffdfbf" alt="Marco Ross" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-gray-900">Marco Ross</h4>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Delivery Partner</p>
                                    </div>
                                </div>
                                <button className="w-8 h-8 rounded-full bg-[#E53935] flex justify-center items-center text-white shadow hover:bg-red-600 transition-colors">
                                    <Phone className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-start gap-3 px-2 pt-2">
                            <div className="text-[#E53935] mt-0.5">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">123 Culinary Drive, Penthouse 4B</p>
                            </div>
                        </div>
                    </div>

                    {/* Cart Card */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex-1 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-extrabold text-xl text-gray-900 tracking-tight">Your Cart</h3>
                            <span className="bg-red-50 text-[#E53935] text-xs font-bold px-3 py-1 rounded-full">{cartItems.length} Items</span>
                        </div>

                        {/* Cart Items List */}
                        <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex gap-4 mb-2">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-sm text-gray-900 w-32 leading-tight">{item.title}</h4>
                                            <span className="font-extrabold text-sm text-gray-900">${item.price.toFixed(2)}</span>
                                        </div>
                                        {/* Quantity Controls match design logic */}
                                        <div className="flex items-center gap-3">
                                            <button className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-400">
                                                <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </button>
                                            <span className="font-bold text-xs text-gray-900">{item.quantity}</span>
                                            {item.id === 1 ? (
                                                <button className="w-5 h-5 rounded-full bg-[#E53935] flex items-center justify-center text-white">
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5H9M5 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                </button>
                                            ) : (
                                                <button className="w-5 h-5 rounded-full bg-[#E53935] flex items-center justify-center text-white">
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cart Summary */}
                        <div className="pt-6 border-t border-gray-100 mt-4">
                            <div className="flex justify-between mb-3">
                                <span className="text-gray-500 font-medium text-sm">Subtotal</span>
                                <span className="text-gray-500 font-bold text-sm">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-4">
                                <span className="text-gray-500 font-medium text-sm">Delivery Fee</span>
                                <span className="text-[#34A853] font-bold text-sm uppercase text-[10px] tracking-wider pt-1">{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between mb-8 pb-4 border-b border-gray-100 border-dashed">
                                <span className="text-gray-900 font-extrabold text-lg">Total</span>
                                <span className="text-[#E53935] font-extrabold text-xl">${total.toFixed(2)}</span>
                            </div>

                            <button className="w-full bg-[#E53935] hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all shadow-md active:scale-[0.98] text-center">
                                Place Order
                            </button>
                        </div>
                    </div>

                </div>

            </main>

            <Footer />
        </div>
    );
};

export default UserDashboard;
