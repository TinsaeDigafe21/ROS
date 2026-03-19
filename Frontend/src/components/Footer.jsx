import React from 'react';
import { Globe, ThumbsUp, AtSign } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#111827] text-gray-300 py-12 px-8 mt-10 w-full mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Brand & Description */}
                <div className="md:col-span-2 flex flex-col items-start pr-12">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full bg-[#E53935] flex justify-center items-center text-white font-bold text-xs leading-none">
                            X
                        </div>
                        <span className="font-extrabold text-[#E53935] tracking-tight">
                            CULINARY<span className="text-white">EXCELLENCE</span>
                        </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-6 max-w-sm">
                        Connecting fine dining enthusiasts with the best chefs in the city. Experience luxury at home.
                    </p>
                    <div className="flex gap-4 text-[#E53935]">
                        <div className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#E53935] hover:text-white transition-all cursor-pointer">
                            <Globe className="w-4 h-4" />
                        </div>
                        <div className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#E53935] hover:text-white transition-all cursor-pointer">
                            <ThumbsUp className="w-4 h-4" />
                        </div>
                        <div className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#E53935] hover:text-white transition-all cursor-pointer">
                            <AtSign className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-xs tracking-widest text-white uppercase mb-2">Navigation</h4>
                    <a href="#" className="text-sm text-gray-400 hover:text-[#E53935]">Our Menu</a>
                    <a href="#" className="text-sm text-gray-400 hover:text-[#E53935]">Recent Orders</a>
                </div>

                {/* Help & Support */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-xs tracking-widest text-white uppercase mb-2">Help & Support</h4>
                    <a href="#" className="text-sm text-gray-400 hover:text-[#E53935]">FAQs</a>
                    <a href="#" className="text-sm text-gray-400 hover:text-[#E53935]">Track Order</a>
                    <a href="#" className="text-sm text-gray-400 hover:text-[#E53935]">Privacy Policy</a>
                    <a href="#" className="text-sm text-gray-400 hover:text-[#E53935]">Contact Us</a>
                </div>

            </div>

            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between">
                <p className="text-xs text-gray-500">© 2024 CulinaryExcellence. All rights reserved.</p>
                <div className="flex gap-4 items-center">
                    {/* Payment Icons */}
                    <div className="w-8 h-5 bg-gray-800 rounded text-[8px] flex justify-center items-center text-gray-400 font-bold border border-gray-700">VISA</div>
                    <div className="w-8 h-5 bg-gray-800 rounded flex justify-center items-center text-[8px] text-gray-400 font-bold border border-gray-700">MC</div>
                    <div className="w-8 h-5 bg-gray-800 rounded flex justify-center items-center text-[8px] text-gray-400 font-bold border border-gray-700">AMEX</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
