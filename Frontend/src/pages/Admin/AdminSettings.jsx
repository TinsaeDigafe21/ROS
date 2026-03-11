import React from 'react';

const AdminSettings = () => {
    return (
        <div className="p-10 max-w-[1400px] mx-auto pb-24">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">System Settings</h1>
            <p className="text-gray-500 mb-10">Configure global application settings and staff permissions.</p>

            {/* KITCHEN STAFF ASSIGNMENT SECTION */}
            <div className="bg-white rounded-2xl p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50 max-w-2xl">
                <div className="mb-8">
                    <h3 className="text-xl font-extrabold text-gray-900 mb-1">Assign Kitchen Staff</h3>
                    <p className="text-sm font-medium text-gray-500">Create new credentials for kitchen team members.</p>
                </div>

                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); /* Placeholder submit */ }}>
                    <div>
                        <label htmlFor="staff-email" className="block text-sm font-bold text-gray-700 mb-2">
                            Staff Email Address
                        </label>
                        <input
                            type="email"
                            id="staff-email"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935] outline-none transition-all placeholder-gray-400"
                            placeholder="kitchen.staff@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="staff-password" className="block text-sm font-bold text-gray-700 mb-2">
                            Assigned Password
                        </label>
                        <input
                            type="password"
                            id="staff-password"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:ring-2 focus:ring-[#E53935]/20 focus:border-[#E53935] outline-none transition-all placeholder-gray-400"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="bg-[#E53935] hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-sm w-full md:w-auto"
                        >
                            Create Staff Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminSettings;
