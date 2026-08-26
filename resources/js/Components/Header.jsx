import { Link, usePage } from '@inertiajs/react';

export default function Header() {
    const { url } = usePage();

    const menuItems = [
        {
            name: 'Inicio',
            href: '/',
            active: url === '/',
            path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
        },
        {
            name: 'Catálogo',
            href: '/catalogo',
            active: url.startsWith('/catalogo'),
            path: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
        },
        {
            name: 'Personaliza',
            href: '/personaliza',
            active: url.startsWith('/personaliza'),
            path: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
        },
        {
            name: 'Nosotros',
            href: '/nosotros',
            active: url.startsWith('/nosotros'),
            path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
        },
        {
            name: 'Contacto',
            href: '/contacto',
            active: url.startsWith('/contacto'),
            path: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
        },
        {
            name: 'Redes',
            href: '/redes',
            active: url.startsWith('/redes'),
            path: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
        }
    ];

    return (
        <>
            {/* ====== NAVEGACIÓN PC (PILLS SUPERIOR + LOGO INTEGRADO) ====== */}
            <header className="hidden md:flex fixed top-6 w-full z-50 pointer-events-none px-6 lg:px-10">
                <div className="w-full max-w-[1400px] mx-auto flex items-center h-20 relative">
                    {/* Menú Centrado Absolutamente */}
                    <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
                        <nav className="flex items-center bg-[#f5f0f0] rounded-full p-1.5 shadow-lg shadow-black/10">
                            <div className="flex items-center px-1 space-x-1">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                                            item.active
                                                ? 'text-white bg-[#5e1923] shadow-sm'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-black/5'
                                        }`}
                                    >
                                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d={item.path} />
                                        </svg>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </nav>
                    </div>

                    {/* Logo - Alineado a la derecha, misma línea base */}
                    <div className="ml-auto pointer-events-auto flex items-center">
                        <Link href="/" className="flex items-center justify-center transition-transform hover:scale-105">
                            <img 
                                src="/images/logo.png" 
                                alt="Logo" 
                                className="h-16 lg:h-20 w-auto object-contain drop-shadow-xl"
                            />
                        </Link>
                    </div>
                </div>
            </header>

            {/* ====== LOGO FLOTANTE PARA MÓVIL ====== */}
            <div className="md:hidden fixed top-6 right-6 z-50 pointer-events-auto">
                <Link href="/" className="flex items-center justify-center transition-transform hover:scale-105">
                    <img 
                        src="/images/logo.png" 
                        alt="Logo" 
                        className="h-14 w-auto object-contain drop-shadow-xl"
                    />
                </Link>
            </div>

            {/* ====== NAVEGACIÓN MÓVIL (DOCK MINIMALISTA COMO LA IMAGEN) ====== */}
            <header className="md:hidden fixed bottom-0 left-0 w-full z-50 pointer-events-auto bg-white rounded-t-[32px] drop-shadow-[0_-4px_15px_rgba(0,0,0,0.1)] h-[80px]">
                <nav className="flex h-full items-center justify-around max-w-lg mx-auto px-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            title={item.name} // Hint de accesibilidad
                            className="flex flex-col items-center justify-center p-3 relative group"
                        >
                            {/* Icono de línea fina como en la imagen */}
                            <svg 
                                className={`w-7 h-7 transition-all duration-300 ${
                                    item.active 
                                        ? 'text-[#5e1923] scale-[1.15] -translate-y-1' 
                                        : 'text-gray-800'
                                }`} 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="1.5" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d={item.path} />
                            </svg>
                            
                            {/* Pequeño punto indicador muy sutil para saber dónde estás sin romper el minimalismo */}
                            <div className={`absolute bottom-2 w-1.5 h-1.5 rounded-full bg-[#5e1923] transition-all duration-300 ${
                                item.active ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                            }`} />
                        </Link>
                    ))}
                </nav>
            </header>
        </>
    );
}
