import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, actions, children }) {
    const user = usePage().props.auth.user;
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const menuItems = [
        { name: 'Inicio', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', href: route('admin.dashboard'), active: route().current('admin.dashboard') },
        { name: 'Productos', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', href: route('admin.productos'), active: route().current('admin.productos') },
        { name: 'Telas', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01', href: route('admin.telas'), active: route().current('admin.telas') },
        { name: 'Nosotros', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', href: route('admin.nosotros'), active: route().current('admin.nosotros') },
        { name: 'Mensajes', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', href: route('admin.mensajes'), active: route().current('admin.mensajes') },
        { name: 'Redes', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9', href: route('admin.redes'), active: route().current('admin.redes') }
    ];

    return (
        <div className="h-screen bg-[#f5f7f9] flex font-sans overflow-hidden">
            
            {/* Sidebar Móvil Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-[#132d46]/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:shadow-none lg:border-r border-gray-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                
                {/* User Profile Area */}
                <div className="p-6">
                    <div className="flex items-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#01c38e] to-[#01a679] text-white flex items-center justify-center font-bold text-sm shadow-sm relative">
                            {user.name.substring(0, 2).toUpperCase()}
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="ml-3 overflow-hidden">
                            <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Menú Principal
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 group ${
                                item.active 
                                    ? 'bg-[#01c38e] text-white shadow-[0_8px_15px_rgba(1,195,142,0.3)]' 
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            <svg 
                                className={`w-5 h-5 mr-3 transition-colors ${item.active ? 'text-white' : 'text-gray-400 group-hover:text-[#01c38e]'}`} 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                            </svg>
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Bottom Actions */}
                <div className="absolute bottom-0 w-full p-6 border-t border-gray-100 bg-white">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex items-center w-full px-4 py-3 text-sm font-semibold text-red-500 rounded-xl hover:bg-red-50 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Cerrar Sesión
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden relative">
                
                {/* Top Header for Mobile & Actions */}
                <header className="bg-white lg:bg-transparent lg:pt-8 lg:px-10 p-4 flex items-center justify-between lg:block z-10 relative border-b lg:border-none border-gray-200">
                    <div className="flex items-center lg:hidden w-full">
                        <button 
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 mr-3 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h1 className="text-xl font-bold text-gray-800">Sillas Elegantes</h1>
                    </div>

                    {header && (
                        <div className="hidden lg:flex items-center justify-between w-full mb-8">
                            <div className="flex-1">
                                {header}
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 text-sm font-semibold text-gray-600">
                                    <span className="w-2 h-2 rounded-full bg-[#01c38e] mr-2 animate-pulse"></span>
                                    Sistema Activo
                                </div>
                                {actions && (
                                    <div className="flex items-center">
                                        {actions}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </header>

                <main className="flex-1 p-4 lg:p-10 lg:pt-0 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
