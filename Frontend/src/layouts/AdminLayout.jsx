import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Layers, ClipboardList, LineChart, Settings, LogOut, UtensilsCrossed } from 'lucide-react';

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // In a real app, clear auth tokens here
        navigate('/');
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
        { name: 'Menu Management', path: '/admin/menu', icon: BookOpen },
        { name: 'Categories', path: '/admin/categories', icon: Layers },
        { name: 'Orders', path: '/admin/orders', icon: ClipboardList },
        { name: 'Reports', path: '/admin/reports', icon: LineChart },
        { name: 'Settings', path: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">

            {/* SIDEBAR */}
            <aside className="w-64 bg-white border-r border-gray-100 flex flex-col pt-8 pb-6 shadow-sm z-10 flex-shrink-0">

                {/* Branding */}
                <div className="px-6 mb-10 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E53935] rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0">
                        <UtensilsCrossed className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="font-extrabold text-[#0F172A] text-lg leading-tight tracking-tight">Culinary</h1>
                        <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mt-0.5">EXCELLENCE ADMIN</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 flex flex-col gap-2 px-4 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.exact}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all relative ${isActive
                                    ? 'text-[#E53935] bg-red-50'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon className={`w-5 h-5 ${isActive ? 'text-[#E53935]' : 'text-gray-400'}`} />
                                    <span>{item.name}</span>
                                    {isActive && (
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#E53935] rounded-l flex-shrink-0"></div>
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Logout */}
                <div className="px-6 mt-auto pt-6">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-sm rounded-xl transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 overflow-y-auto relative bg-[#F8FAFC]">
                <Outlet />
            </main>

        </div>
    );
};

export default AdminLayout;
