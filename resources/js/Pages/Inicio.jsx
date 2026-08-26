import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import { useState, useEffect } from 'react';

function useCountUp(end, duration = 2000) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            // Ease out effect
            const easeOut = 1 - Math.pow(1 - percentage, 4);
            setCount(Math.floor(easeOut * end));
            
            if (percentage < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [end, duration]);

    return count;
}

export default function Inicio() {
    const modelsCount = useCountUp(40, 2000);
    const qualityCount = useCountUp(100, 2500);

    return (
        <div className="min-h-screen bg-[#f9f8f6] text-brand-darker font-sans antialiased overflow-hidden">
            <Head title="Inicio" />
            <Header />
            
            <main className="w-full min-h-screen md:h-screen pt-8 md:pt-0 flex flex-col md:flex-row">
                
                {/* LEFT COLUMN - TEXT */}
                <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12 lg:px-20 py-8 md:py-0 relative z-10">
                    
                    {/* Overline */}
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-10 h-[2px] bg-brand"></div>
                        <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold text-gray-500">
                            Diseño que permanece
                        </span>
                    </div>
                    
                    {/* Heading */}
                    <h1 className="text-5xl md:text-5xl lg:text-7xl font-semibold leading-[1.05] text-brand-darker tracking-tight mb-5">
                        La silla <br />
                        <span className="font-cursive text-brand font-bold text-[5.5rem] md:text-[6rem] lg:text-[7.5rem] inline-block -my-3 md:-my-5 transform -rotate-2 drop-shadow-sm">perfecta</span> <br />
                        para tu espacio.
                    </h1>
                    
                    {/* Paragraph */}
                    <p className="text-gray-600 text-base md:text-lg lg:text-xl max-w-md leading-relaxed mb-8">
                        Fabricamos sillas pensadas para combinar diseño, comodidad y calidad. Piezas que acompañan cómo vives y trabajas.
                    </p>
                    
                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-5 mt-2">
                        <Link 
                            href="/catalogo" 
                            className="group relative overflow-hidden bg-gradient-to-r from-brand-darker to-brand-dark text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase shadow-[0_8px_20px_rgba(26,30,41,0.2)] hover:shadow-[0_12px_25px_rgba(1,195,142,0.3)] hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center"
                        >
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                            <span className="relative z-10">Explorar Catálogo</span>
                            {/* Icono más grande (w-5 h-5) */}
                            <svg className="relative z-10 w-5 h-5 ml-3 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </Link>
                        
                        <Link 
                            href="/personaliza" 
                            className="bg-transparent border-2 border-brand text-brand px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase shadow-sm hover:bg-brand hover:text-white hover:shadow-[0_8px_20px_rgba(1,195,142,0.3)] hover:-translate-y-1 active:scale-95 transition-all duration-300 flex items-center group"
                        >
                            <span>Personalizar</span>
                            {/* Icono más grande (w-5 h-5) */}
                            <svg className="w-5 h-5 ml-3 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                        </Link>
                    </div>

                    {/* Contadores / Estadísticas Animadas */}
                    <div className="mt-12 flex items-center space-x-10 animate-[fadeIn_1s_ease-out_0.5s_both]">
                        <div>
                            <h4 className="text-4xl font-extrabold text-brand-darker tracking-tight">+{modelsCount}</h4>
                            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-semibold mt-1">Modelos Únicos</p>
                        </div>
                        <div className="w-px h-10 bg-gray-300"></div>
                        <div>
                            <h4 className="text-4xl font-extrabold text-brand-darker tracking-tight">{qualityCount}%</h4>
                            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-semibold mt-1">Calidad Premium</p>
                        </div>
                    </div>

                </div>
                
                {/* RIGHT COLUMN - IMAGE BLOCK */}
                {/* Se eliminó COMPLETAMENTE el fondo de color para que sea transparente */}
                <div className="w-full md:w-1/2 relative flex items-center justify-center min-h-[50vh] md:h-screen p-8 lg:p-16">
                    
                    {/* Elemento de diseño de fondo muy sutil (opcional para dar volumen sin fondo cuadrado) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-brand/5 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative w-full max-w-[400px] lg:max-w-[550px] flex items-center justify-center group z-10">
                        <img 
                            src="/images/logo.png" 
                            alt="Silla protagonista" 
                            className="object-contain w-full h-auto drop-shadow-[0_25px_45px_rgba(0,0,0,0.15)] transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700 ease-out animate-[pulse_6s_ease-in-out_infinite]"
                        />
                    </div>
                </div>
                
            </main>
        </div>
    );
}
