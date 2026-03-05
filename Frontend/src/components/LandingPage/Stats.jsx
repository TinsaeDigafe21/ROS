import React from 'react';

const Stats = () => {
    return (
        <section className="container mx-auto px-4 py-16 border-t border-b border-gray-100 mt-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                <div>
                    <i className="fa-solid fa-utensils text-primary text-3xl mb-4"></i>
                    <h3 className="text-3xl font-bold mb-1">25+</h3>
                    <p className="text-gray-500 text-sm font-medium tracking-wide">DAILY SPECIALS</p>
                </div>
                <div>
                    <i className="fa-solid fa-star text-primary text-3xl mb-4"></i>
                    <h3 className="text-3xl font-bold mb-1">4.9/5</h3>
                    <p className="text-gray-500 text-sm font-medium tracking-wide">AVERAGE RATING</p>
                </div>
                <div>
                    <i className="fa-regular fa-clock text-primary text-3xl mb-4"></i>
                    <h3 className="text-3xl font-bold mb-1">20-30</h3>
                    <p className="text-gray-500 text-sm font-medium tracking-wide">MIN PREP TIME</p>
                </div>
                <div>
                    <i className="fa-solid fa-bag-shopping text-primary text-3xl mb-4"></i>
                    <h3 className="text-3xl font-bold mb-1">Free</h3>
                    <p className="text-gray-500 text-sm font-medium tracking-wide">ON ORDERS $50+</p>
                </div>
            </div>
        </section>
    );
};

export default Stats;
