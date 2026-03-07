import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between bg-white border-b border-gray-100">
            <Link to="/" className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity">
                <div className="bg-primary text-white p-2 rounded-md flex items-center justify-center">
                    <i className="fa-solid fa-utensils text-sm"></i>
                </div>
                <span className="font-bold text-xl tracking-tight">CulinaryExcellence</span>
            </Link>

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
                <Link to="/dashboard/kitchen" className="bg-orange-100 text-orange-600 px-6 py-2 rounded-full font-medium hover:bg-orange-200 transition-colors inline-block text-center whitespace-nowrap">
                    Kitchen
                </Link>
                <Link to="/dashboard/user" className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-red-600 transition-colors inline-block text-center whitespace-nowrap">
                    Dashboard
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
