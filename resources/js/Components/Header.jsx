import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
    const { url } = usePage();
    const pcNavRef = useRef(null);
    const mobileNavRef = useRef(null);
    
    const [pcActiveRect, setPcActiveRect] = useState({ left: 0, width: 0, height: 0, top: 0 });
    const [mobileActiveX, setMobileActiveX] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

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
            path: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
        },
        {
            name: 'Personaliza',
            href: '/personaliza',
            active: url.startsWith('/personaliza'),
            path: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
        },
        {
            name: 'Nosotros',
            href: '/nosotros',
            active: url.startsWith('/nosotros'),
            path: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        },
        {
            name: 'Contacto',
            href: '/contacto',
            active: url.startsWith('/contacto'),
            path: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
        },
        {
            name: 'Redes',
            href: '/redes',
            active: url.startsWith('/redes'),
            path: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
        }
    ];

    const activeIndex = menuItems.findIndex(item => item.active);

    useEffect(() => {
        setIsMounted(true);
        const updatePositions = () => {
            const idx = activeIndex !== -1 ? activeIndex : 0;
            
            // Lógica para PC: Calcular caja del elemento activo usando getBoundingClientRect
            // Esto soluciona problemas de centrado y offsetParent
            if (pcNavRef.current) {
                const links = Array.from(pcNavRef.current.querySelectorAll('a'));
                const activeEl = links[idx];
                if (activeEl) {
                    const navRect = pcNavRef.current.getBoundingClientRect();
                    const elRect = activeEl.getBoundingClientRect();
                    setPcActiveRect({
                        left: elRect.left - navRect.left,
                        top: elRect.top - navRect.top,
                        width: elRect.width,
                        height: elRect.height
                    });
                }
            }

            // Lógica para Móvil: Calcular centro del elemento activo para el punto flotante
            if (mobileNavRef.current) {
                const links = Array.from(mobileNavRef.current.querySelectorAll('a'));
                const activeEl = links[idx];
                if (activeEl) {
                    setMobileActiveX(activeEl.offsetLeft + activeEl.offsetWidth / 2);
                }
            }
        };

        const timeout = setTimeout(updatePositions, 100);
        window.addEventListener('resize', updatePositions);
        
        return () => {
            clearTimeout(timeout);
            window.removeEventListener('resize', updatePositions);
        };
    }, [activeIndex, url]);

    return (
        <>
            {/* ====== NAVEGACIÓN PC (PILLS SUPERIOR + LOGO INTEGRADO) ====== */}
            <header className={`hidden md:flex fixed top-6 w-full z-50 pointer-events-none px-6 lg:px-10 transition-all duration-700 ease-out ${isMounted ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
                <div className="w-full max-w-[1400px] mx-auto flex items-center h-20 relative">
                    
                    {/* Menú Centrado Absolutamente */}
                    <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
                        <nav ref={pcNavRef} className="relative flex items-center bg-[#f5f0f0]/90 backdrop-blur-md rounded-full p-2 shadow-xl shadow-black/10 border border-white/40">
                            
                            {/* ====== EFECTO PC: Píldora animada deslizante de fondo ====== */}
                            <div 
                                className="absolute bg-gradient-to-r from-[#01c38e] to-[#01a679] rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-md"
                                style={{
                                    left: `${pcActiveRect.left}px`,
                                    top: `${pcActiveRect.top}px`,
                                    width: `${pcActiveRect.width}px`,
                                    height: `${pcActiveRect.height}px`,
                                    opacity: pcActiveRect.width > 0 ? 1 : 0 // Ocultar hasta calcular
                                }}
                            />

                            <div className="relative z-10 flex items-center space-x-1">
                                {menuItems.map((item, idx) => {
                                    const isActive = activeIndex === idx;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`flex items-center px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-full group ${
                                                isActive
                                                    ? 'text-white drop-shadow-sm scale-105'
                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-black/5'
                                            }`}
                                        >
                                            <svg className={`w-4 h-4 mr-2 transition-transform duration-300 ${!isActive && 'group-hover:scale-110 group-hover:-rotate-6'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d={item.path} />
                                            </svg>
                                            {item.name}
                                        </Link>
                                    )
                                })}
                            </div>
                        </nav>
                    </div>

                    {/* Logo - Alineado a la derecha con un leve efecto de resplandor (Glow) al pasar el mouse */}
                    <div className="ml-auto pointer-events-auto flex items-center">
                        <Link href="/" className="flex items-center justify-center transition-all duration-500 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(1,195,142,0.4)]">
                            <img 
                                src="/images/logo.png" 
                                alt="Logo" 
                                className={`h-24 lg:h-32 w-auto object-contain drop-shadow-lg ${!url.startsWith('/redes') ? 'brightness-0 opacity-90' : ''}`}
                            />
                        </Link>
                    </div>
                </div>
            </header>

            {/* ====== LOGO FLOTANTE PARA MÓVIL (Con animación de entrada) ====== */}
            <div className={`md:hidden fixed top-6 right-6 z-50 pointer-events-auto transition-all duration-700 ease-out delay-100 ${isMounted ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                <Link href="/" className="flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <img 
                        src="/images/logo.png" 
                        alt="Logo" 
                        className={`h-20 sm:h-24 w-auto object-contain drop-shadow-xl ${!url.startsWith('/redes') ? 'brightness-0 opacity-90' : ''}`}
                    />
                </Link>
            </div>

            {/* ====== NAVEGACIÓN MÓVIL (DOCK INFERIOR CON EFECTOS) ====== */}
            <header className={`md:hidden fixed bottom-0 left-0 w-full z-50 pointer-events-auto bg-white/95 backdrop-blur-xl rounded-t-[32px] drop-shadow-[0_-8px_20px_rgba(0,0,0,0.08)] border-t border-gray-100 h-[80px] transition-all duration-700 ease-out ${isMounted ? 'translate-y-0' : 'translate-y-20'}`}>
                <div className="relative w-full h-full max-w-lg mx-auto">
                    
                    {/* ====== EFECTO MÓVIL: Punto indicador deslizante ====== */}
                    <div 
                        className="absolute bottom-[2px] w-1.5 h-1.5 rounded-full bg-[#01c38e] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm"
                        style={{ 
                            left: 0,
                            transform: `translateX(${mobileActiveX - 3}px)`, // -3px para centrar el dot de 6px (w-1.5)
                            opacity: mobileActiveX > 0 ? 1 : 0
                        }}
                    />

                    <nav ref={mobileNavRef} className="relative z-10 flex h-full items-center justify-around px-1">
                        {menuItems.map((item, idx) => {
                            const isActive = activeIndex === idx;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex-1 flex flex-col items-center justify-center h-full pt-1 pb-1 group cursor-pointer"
                                >
                                    {/* Contenedor del ícono con un rebote de resorte (spring bounce) súper satisfactorio */}
                                    <div className={`transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                                        isActive 
                                            ? 'text-[#01c38e] scale-[1.2] -translate-y-[6px] drop-shadow-md' 
                                            : 'text-gray-400 group-hover:text-gray-700 group-hover:-translate-y-1'
                                    }`}>
                                        <svg className="w-[26px] h-[26px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d={item.path} />
                                        </svg>
                                    </div>
                                    
                                    {/* El texto también acompaña el movimiento con un pequeño fundido */}
                                    <span className={`text-[10px] sm:text-[11px] font-semibold mt-1 transition-all duration-500 ${
                                        isActive 
                                            ? 'text-[#01c38e] opacity-100 -translate-y-0.5' 
                                            : 'text-gray-400 opacity-70 group-hover:opacity-100'
                                    }`}>
                                        {item.name}
                                    </span>
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </header>
        </>
    );
}
