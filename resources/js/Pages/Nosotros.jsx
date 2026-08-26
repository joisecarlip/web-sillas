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

export default function Nosotros({ expertos = [] }) {
    const yearsCount = useCountUp(10, 2000);
    const piecesCount = useCountUp(5000, 2500);
    const projectsCount = useCountUp(100, 2000);

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
            
            <main className="w-full pt-10 md:pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
                
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

                {/* SECTION 2: TEAM (MAESTROS SILLEROS) */}
                <div className="flex flex-col items-center mb-16 text-center mt-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-darker mb-4">
                        Expertos en <span className="font-cursive text-brand text-5xl md:text-6xl font-bold">Ergonomía</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl text-lg">
                        Un equipo apasionado por los materiales nobles, el diseño funcional y la creación de sillas que transforman por completo tu forma de sentarte.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {expertos.map((member) => (
                        <div key={member.id} className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100 hover:shadow-[0_20px_40px_rgb(1,195,142,0.15)] hover:-translate-y-2 transition-all duration-300 group flex flex-col">
                            
                            {/* Image Container - Grayscale to Color effect */}
                            <div className="relative h-64 overflow-hidden bg-gray-100">
                                {member.image_url ? (
                                    <img src={member.image_url} alt={member.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out grayscale group-hover:grayscale-0" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">Sin foto</div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-darker/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            
                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow relative bg-white z-10">
                                <h3 className="text-xl font-bold text-brand-darker mb-1">{member.name}</h3>
                                <p className="text-brand font-semibold text-sm mb-1">{member.role}</p>
                                <p className="text-gray-400 text-xs uppercase tracking-wider mb-6">{member.area}</p>
                                
                                {/* Social Buttons */}
                                <div className="mt-auto flex space-x-3 pt-4 border-t border-gray-100">
                                    {member.whatsapp && (
                                        <a href={member.whatsapp} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300 active:scale-95 group/btn">
                                            <svg className="w-5 h-5 transform group-hover/btn:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                                        </a>
                                    )}
                                    {member.email && (
                                        <a href={`mailto:${member.email}`} className="flex-1 flex items-center justify-center py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-[#01c38e] hover:text-white hover:border-[#01c38e] transition-all duration-300 active:scale-95 group/btn">
                                            <svg className="w-5 h-5 transform group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
            </main>
        </div>
    );
}
