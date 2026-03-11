import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative h-[600px] flex items-center justify-center text-center mt-6 mx-4 md:mx-auto container rounded-3xl overflow-hidden shadow-2xl">
            {/* Background Image overlay */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2000')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            <div className="relative z-10 text-white max-w-3xl px-6">
                <span className="inline-block border border-primary text-primary px-4 py-1 rounded-full text-xs font-bold tracking-widest mb-6">
                    PREMIUM DINING EXPERIENCE
                </span>

                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                    Experience <span className="text-primary">Culinary</span><br />
                    <span className="text-primary">Excellence</span> Delivered to<br />
                    Your Door
                </h1>

                <p className="text-gray-200 mb-10 text-lg md:text-xl max-w-2xl mx-auto">
                    Gourmet meals prepared by Michelin-starred chefs, delivered fresh to your home or reserved for an unforgettable dining experience.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <Link to="/dashboard/user" className="bg-primary text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-red-600 transition-colors w-full sm:w-auto text-center inline-block">
                        Explore Menu
                    </Link>
                    <button className="bg-transparent border border-white text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-colors w-full sm:w-auto">
                        Book a Table
                    </button>
                </div>

                <div className="flex items-center justify-center gap-12 text-center border-t border-white/20 pt-8 mt-12">
                    <div>
                        <h3 className="text-primary text-3xl font-bold">50+</h3>
                        <p className="text-xs tracking-wider text-gray-300 mt-1 uppercase">Daily Specials</p>
                    </div>
                    <div className="w-px h-12 bg-white/20"></div>
                    <div>
                        <h3 className="text-primary text-3xl font-bold">15min</h3>
                        <p className="text-xs tracking-wider text-gray-300 mt-1 uppercase">Average Prep</p>
                    </div>
                    <div className="w-px h-12 bg-white/20"></div>
                    <div>
                        <h3 className="text-primary text-3xl font-bold">4.9/5</h3>
                        <p className="text-xs tracking-wider text-gray-300 mt-1 uppercase">Customer Rating</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
