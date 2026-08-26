import { Link, usePage } from '@inertiajs/react';

export default function Header() {
    const { url } = usePage();

    const menuItems = [
        {
            name: 'Inicio',
            href: '/',
            active: url === '/',
            icon: (
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            name: 'Catálogo',
            href: '/catalogo',
            active: url.startsWith('/catalogo'),
            icon: (
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            )
        },
        {
            name: 'Personaliza',
            href: '/personaliza',
            active: url.startsWith('/personaliza'),
            icon: (
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            )
        },
        {
            name: 'Nosotros',
            href: '/nosotros',
            active: url.startsWith('/nosotros'),
            icon: (
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            name: 'Contacto',
            href: '/contacto',
            active: url.startsWith('/contacto'),
            icon: (
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        }
    ];

    return (
        <header className="fixed top-6 w-full z-50 flex justify-center items-center px-4">
            <div className="flex items-center gap-4">
                {/* Menú Principal (Pill) */}
                <nav className="flex items-center bg-[#f5f0f0] rounded-full p-1.5 shadow-lg shadow-black/10">
                    <div className="flex items-center px-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                                    item.active
                                        ? 'text-gray-900 bg-black/5'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-black/5'
                                }`}
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Botón Redes (Dentro del Pill) */}
                    <div className="pl-2 border-l border-gray-300/50">
                        <Link href="/redes" className="flex items-center px-5 py-2.5 bg-[#5e1923] hover:bg-[#4a131b] text-white text-sm font-medium rounded-full transition-colors shadow-sm">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                            Redes
                        </Link>
                    </div>
                </nav>

                {/* Logo (Sin burbuja) */}
                <Link href="/" className="flex items-center justify-center h-[52px] transition-transform hover:scale-105">
                    <img 
                        src="/images/logo.png" 
                        alt="Logo" 
                        className="h-10 w-auto object-contain drop-shadow-md"
                    />
                </Link>
            </div>
        </header>
    );
}
