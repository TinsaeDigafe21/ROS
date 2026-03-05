import React from 'react';

const CTA = () => {
    return (
        <section className="container mx-auto px-4 mt-24">
            <div className="bg-primary rounded-3xl py-16 px-8 text-center text-white shadow-xl shadow-red-200">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to taste the difference?</h2>
                <p className="text-red-100 text-lg mb-10 max-w-2xl mx-auto">
                    Explore our seasonal menu and order your first gourmet meal today.
                </p>
                <button className="bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg">
                    Browse Our Menu
                </button>
            </div>
        </section>
    );
};

export default CTA;
