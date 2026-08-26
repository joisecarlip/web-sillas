import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import { useState, useEffect } from 'react';

// Custom hook para la animación de números
function useCountUp(end, duration = 2000) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
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

export default function Nosotros() {
    const yearsCount = useCountUp(10, 2000);
    const piecesCount = useCountUp(5000, 2500);
    const projectsCount = useCountUp(100, 2000);

    const team = [
        {
            name: "Cristian Silla",
            role: "Fundador & Diseñador Principal",
            area: "Dirección Creativa",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            name: "Elena Torres",
            role: "Jefa de Producción",
            area: "Manufactura",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            name: "Marcos Ruiz",
            role: "Ingeniero de Producto",
            area: "Innovación & Materiales",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            name: "Sofía Castro",
            role: "Directora de Ventas",
            area: "Relaciones Comerciales",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        }
    ];

    // Formateador visual para 5000 -> 5k
    const formatPieces = (num) => {
        if (num >= 4900) return '5k';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
        return num;
    };

    return (
        <div className="min-h-screen bg-[#f9f8f6] text-brand-darker font-sans antialiased overflow-hidden selection:bg-brand selection:text-white">
            <Head title="Nosotros" />
            <Header />
            
            <main className="w-full pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
                
                {/* SECTION 1: NUESTRO OFICIO */}
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-32 items-center">
                    
                    {/* Left Column - Título */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-8 h-[2px] bg-brand"></div>
                            <span className="uppercase tracking-[0.2em] text-xs font-bold text-gray-500">
                                Nuestro Oficio
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] text-brand-darker tracking-tight">
                            Objetos para <br/>
                            <span className="font-cursive text-brand font-bold text-[5.5rem] md:text-[7rem] lg:text-[8rem] inline-block transform -rotate-2 -my-2 drop-shadow-sm">vivirlos</span>, <br/>
                            no solo mirarlos.
                        </h1>
                    </div>
                    
                    {/* Right Column - Texto y Contadores */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-12 max-w-lg">
                            Desde 2014, diseñamos y fabricamos mobiliario que encuentra el equilibrio perfecto entre belleza, confort y permanencia. Trabajamos con interioristas, arquitectos y personas que buscan algo verdaderamente hecho a su medida.
                        </p>
                        
                        <div className="w-full h-px bg-gray-200 mb-10"></div>
                        
                        {/* Stats / Contadores */}
                        <div className="grid grid-cols-3 gap-6 animate-[fadeIn_1s_ease-out_0.5s_both]">
                            <div>
                                <h4 className="text-4xl lg:text-5xl font-extrabold text-brand-darker tracking-tight mb-2">
                                    {yearsCount}+
                                </h4>
                                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-semibold">Años de oficio</p>
                            </div>
                            <div>
                                <h4 className="text-4xl lg:text-5xl font-extrabold text-brand-darker tracking-tight mb-2">
                                    {formatPieces(piecesCount)}
                                </h4>
                                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-semibold">Piezas creadas</p>
                            </div>
                            <div>
                                <h4 className="text-4xl lg:text-5xl font-extrabold text-brand-darker tracking-tight mb-2">
                                    {projectsCount}+
                                </h4>
                                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-semibold">Proyectos</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 2: TEAM (LÍDERES EN INNOVACIÓN) */}
                <div className="flex flex-col items-center mb-16 text-center mt-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-darker mb-4">
                        Líderes en <span className="font-cursive text-brand text-5xl md:text-6xl font-bold">Innovación</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl text-lg">
                        Profesionales comprometidos con la excelencia del diseño, la transferencia tecnológica y la creación de piezas únicas.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <div key={index} className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100 hover:shadow-[0_20px_40px_rgb(1,195,142,0.15)] hover:-translate-y-2 transition-all duration-300 group flex flex-col">
                            
                            {/* Image Container - Grayscale to Color effect */}
                            <div className="relative h-64 overflow-hidden bg-gray-100">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out grayscale group-hover:grayscale-0" />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-darker/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            
                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow relative bg-white z-10">
                                <h3 className="text-xl font-bold text-brand-darker mb-1">{member.name}</h3>
                                <p className="text-brand font-semibold text-sm mb-1">{member.role}</p>
                                <p className="text-gray-400 text-xs uppercase tracking-wider mb-6">{member.area}</p>
                                
                                {/* Social Buttons */}
                                <div className="mt-auto flex space-x-3 pt-4 border-t border-gray-100">
                                    <button className="flex-1 flex items-center justify-center py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-brand hover:text-white hover:border-brand transition-all duration-300 active:scale-95 group/btn">
                                        <svg className="w-4 h-4 transform group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                    </button>
                                    <button className="flex-1 flex items-center justify-center py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-brand hover:text-white hover:border-brand transition-all duration-300 active:scale-95 group/btn">
                                        <svg className="w-5 h-5 transform group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
            </main>
        </div>
    );
}
