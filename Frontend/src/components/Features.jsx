import React from 'react';

const Features = () => {
    const features = [
        {
            icon: "fa-leaf",
            title: "Fresh Ingredients",
            description: "Sourced daily from local organic farms. We ensure only the highest quality, pesticide-free produce reaches your plate."
        },
        {
            icon: "fa-utensils",
            title: "Expert Chefs",
            description: "Our award-winning culinary masters bring decades of experience from Michelin-starred kitchens to craft every single dish."
        },
        {
            icon: "fa-truck",
            title: "Fast Delivery",
            description: "Hot and fresh meals delivered to your door in 30 minutes. Our specialized packaging keeps flavor and heat intact."
        }
    ];

    return (
        <section className="bg-gray-50 py-24 mt-24 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 inline-block relative">
                        Why Choose <span className="text-primary">GourmetBite</span>
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full"></div>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center border border-gray-100">
                            <div className="w-16 h-16 bg-red-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                                <i className={`fa-solid ${feature.icon}`}></i>
                            </div>
                            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
