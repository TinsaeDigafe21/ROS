import React from 'react';

const Footer = () => {
    return (
        <>
            <section className="container mx-auto px-4 mt-24 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Locations */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8">Our Locations</h3>
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                <div className="h-32 rounded-xl bg-gray-200 mb-4 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=400" alt="Downtown" className="w-full h-full object-cover" />
                                </div>
                                <h4 className="font-bold text-lg mb-2">Downtown Hub</h4>
                                <p className="text-gray-500 text-sm flex items-start gap-2">
                                    <i className="fa-solid fa-location-dot mt-1 text-primary"></i>
                                    <span>123 Main St,<br />City Center</span>
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                <div className="h-32 rounded-xl bg-gray-200 mb-4 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400" alt="Westside" className="w-full h-full object-cover" />
                                </div>
                                <h4 className="font-bold text-lg mb-2">Westside Bistro</h4>
                                <p className="text-gray-500 text-sm flex items-start gap-2">
                                    <i className="fa-solid fa-location-dot mt-1 text-primary"></i>
                                    <span>456 Sunset Blvd,<br />Westside</span>
                                </p>
                            </div>
                        </div>
                        {/* Map Placeholder */}
                        <div className="relative h-48 bg-gray-200 rounded-3xl overflow-hidden grayscale opacity-80 border border-gray-300">
                            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800" className="w-full h-full object-cover opacity-50" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-primary text-2xl animate-bounce">
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hours & Contact */}
                    <div className="flex flex-col justify-between">
                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 mb-8 flex-1">
                            <h3 className="text-2xl font-bold mb-6">Opening Hours</h3>
                            <ul className="space-y-4">
                                <li className="flex justify-between border-b border-gray-200 pb-4">
                                    <span className="text-gray-600">Monday - Thursday</span>
                                    <span className="font-semibold">11:00 AM - 10:00 PM</span>
                                </li>
                                <li className="flex justify-between border-b border-gray-200 pb-4">
                                    <span className="text-gray-600">Friday - Saturday</span>
                                    <span className="font-semibold">11:00 AM - 12:00 AM</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-gray-600">Sunday</span>
                                    <span className="font-semibold">11:00 AM - 9:00 PM</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-bold mb-6 text-gray-400 uppercase tracking-widest text-sm">Contact Info</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-primary text-lg">
                                        <i className="fa-solid fa-phone"></i>
                                    </div>
                                    <span className="font-semibold text-lg hover:text-primary cursor-pointer transition-colors">+1 (555) 000-1234</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-primary text-lg">
                                        <i className="fa-solid fa-envelope"></i>
                                    </div>
                                    <span className="font-semibold text-lg hover:text-primary cursor-pointer transition-colors">hello@culinaryexcellence.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Actual Footer */}
            <footer className="bg-[#111827] text-white pt-16 pb-8 border-t border-gray-800">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-gray-800 pb-12 gap-8 md:gap-0">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <div className="bg-primary text-white p-2 rounded-md flex items-center justify-center">
                                <i className="fa-solid fa-utensils text-sm"></i>
                            </div>
                            <span className="font-bold text-xl tracking-tight">CulinaryExcellence</span>
                        </div>

                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors">
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors">
                                <i className="fa-brands fa-facebook"></i>
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm gap-4">
                        <p>&copy; 2024 Culinary Excellence, Crafted for Gourmets. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
