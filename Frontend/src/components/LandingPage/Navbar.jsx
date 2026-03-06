import React from 'react';

const Navbar = () => {
    return (
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between bg-white border-b border-gray-100">
            <div className="flex items-center gap-2 cursor-pointer">
                <div className="bg-primary text-white p-2 rounded-md flex items-center justify-center">
                    <i className="fa-solid fa-utensils text-sm"></i>
                </div>
                <span className="font-bold text-xl tracking-tight">CulinaryExcellence</span>
            </div>

            <ul className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
                <li><a href="#" className="text-gray-900 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Menu</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Locations</a></li>
            </ul>

            <div className="flex items-center gap-4">
                <div className="hidden lg:flex items-center bg-gray-100 px-4 py-2 rounded-full">
                    <i className="fa-solid fa-search text-gray-400 mr-2"></i>
                    <input
                        type="text"
                        placeholder="Search dishes..."
                        className="bg-transparent border-none outline-none text-sm w-48"
                    />
                </div>
                <button className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-red-600 transition-colors">
                    Sign In
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
