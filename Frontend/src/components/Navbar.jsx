import React from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-white sticky top-0 z-50">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-[#E53935] flex justify-center items-center text-white font-bold text-xl leading-none">
                    {/* using a stylized 'X' or spoon/fork since original logo has a custom icon */}
                    X
                </div>
                <span className="font-extrabold text-xl tracking-tight text-[#E53935]">
                    CULINARY<span className="text-gray-900">EXCELLENCE</span>
                </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex flex-1 justify-center gap-8 font-semibold text-gray-900 text-sm">
                <a href="#" className="hover:text-[#E53935] transition-colors">Menu</a>
                <a href="#" className="hover:text-[#E53935] transition-colors">Orders</a>
                <a href="#" className="hover:text-[#E53935] transition-colors">Profile</a>
            </div>

            {/* Right section: Search, Cart, Profile */}
            <div className="flex items-center gap-6">
                <div className="relative hidden md:block group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-[#E53935]" />
                    <input
                        type="text"
                        placeholder="Search for dishes..."
                        className="pl-10 pr-4 py-2 rounded-full bg-gray-100/80 text-sm border-none focus:ring-2 focus:ring-[#E53935]/20 focus:bg-white transition-all w-64 text-gray-700 outline-none"
                    />
                </div>

                <div className="relative cursor-pointer hover:scale-105 transition-transform">
                    <ShoppingCart className="w-6 h-6 text-[#E53935]" />
                    <span className="absolute -top-1.5 -right-2 bg-[#E53935] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                        3
                    </span>
                </div>

                <div className="w-9 h-9 rounded-full bg-orange-100 overflow-hidden cursor-pointer shadow-sm hover:shadow active:scale-95 transition-all">
                    <img
                        src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=ffd5dc"
                        alt="User avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
