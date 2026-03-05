import React from 'react';

const Story = () => {
    return (
        <section className="container mx-auto px-4 mt-24">
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl flex items-center">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2000')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
                </div>

                <div className="relative z-10 text-white max-w-lg pl-12 md:pl-20">
                    <span className="text-primary font-bold text-sm tracking-widest uppercase mb-2 block">Since 1994</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Story & Quality</h2>
                    <p className="text-gray-200 text-lg">
                        Crafting unforgettable culinary experiences through tradition, passion, and the finest ingredients nature provides.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Story;
