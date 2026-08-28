import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';

// -----------------------------------------------------------------
// Capas de la silla. Las 4 imágenes comparten el mismo lienzo
// (2000x2000px) y por eso, al apilarlas como position:absolute
// inset-0, encajan exactas entre sí sin necesidad de recalcular
// coordenadas.
// -----------------------------------------------------------------
import fierroRossi from '@/assets/fierro_rossi.png';
// Máscaras YA RECORTADAS a su propio recuadro (no al lienzo completo
// de 2000x2000), para que cada pieza muestre la imagen de tela
// entera dentro de su propia área.
import tapizSuperiorMask from '@/assets/tapiz_superior_cropped.png';
import tapizLateralIzqMask from '@/assets/tapiz_lateral_izquierdo_cropped.png';
import tapizLateralDerMask from '@/assets/tapiz_lateral_derecho_cropped.png';

// =================================================================
// CONFIGURACIÓN DE COLORES DEL FIERRO
// =================================================================
// Ahora es SÚPER FÁCIL: 
// - colorBoton: Es el color del circulito en el menú.
// - colorImagenHex: ¡Es el color con el que se pintará la FOTO del fierro!
// - ajustesDeLuz: Opcional. Úsalo si quieres oscurecer o dar más contraste a la foto base.
const CONFIG_COLORES_FIERRO = {
    negro: {
        nombre: 'Negro Profundo',
        colorBoton: '#000000', 
        colorImagenHex: 'transparent',
        ajustesDeLuz: 'brightness(0.15) contrast(2.8)',
        blendMode: 'multiply'
    },
    blanco: {
        nombre: 'Blanco Hueso',
        colorBoton: '#e3dac9', // Color hueso más marcado (crema/amarillento)
        colorImagenHex: '#e3dac9',
        ajustesDeLuz: 'brightness(1.1) contrast(1.1)', // Bajamos el brillo base para que el tinte hueso agarre bien
        blendMode: 'color'
    },
    marron: {
        nombre: 'Marrón Oscuro',
        colorBoton: '#200b02',
        colorImagenHex: '#200b02', 
        ajustesDeLuz: 'brightness(1) contrast(1.2)', 
        blendMode: 'multiply' 
    },
    plomo: {
        nombre: 'Plomo Cromado',
        colorBoton: '#555555', // Botón un poco más oscuro
        colorImagenHex: 'transparent',
        // Bajamos el brightness a 0.3 para hacerlo un plomo más oscuro
        ajustesDeLuz: 'brightness(0.3) contrast(1.3) saturate(0)',
        blendMode: 'color'
    }
};

// Sombra general que se aplica a todos los colores (hace que parezca asentado en el piso)
const SOMBRA_BASE_FIERRO = 'drop-shadow(0px 15px 20px rgba(0,0,0,0.35))';
// =================================================================

export default function Personaliza({ telas = [] }) {
    const [fierroColor, setFierroColor] = useState('blanco');
    const [selectedTela, setSelectedTela] = useState(telas.length > 0 ? telas[0] : null);
    const [currentStep, setCurrentStep] = useState(1);

    // Generamos las opciones de fierro dinámicamente desde la variable global de arriba
    const fierroOptions = Object.keys(CONFIG_COLORES_FIERRO).map(key => ({
        id: key,
        name: CONFIG_COLORES_FIERRO[key].nombre,
        hex: CONFIG_COLORES_FIERRO[key].colorBoton
    }));

    // Cada pieza de tapiz usa su propio PNG (ya recortado a su bbox)
    // como "molde" (mask-image), y se posiciona con left/top/width/height.
    // bgTransform permite rotar o deformar la textura (ej: para hacerla diagonal)
    // simulando perspectiva 3D, SIN deformar la máscara.
    const tapizPieces = [
        { 
            name: 'superior', 
            mask: tapizSuperiorMask, 
            // Bajamos un poquito la pieza superior (top: 34.45 en lugar de 33.95)
            box: { left: 7.40, top: 34.45, width: 87.75, height: 22.40 },
            bgTransform: 'perspective(440px) rotateX(60deg) rotateZ(-50deg) scale(1.6)',
            overlay: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.05) 100%)'
        },
        { 
            name: 'lateral-izq', 
            mask: tapizLateralIzqMask, 
            box: { left: 6.35, top: 40.85, width: 29.50, height: 27.65 },
            bgTransform: 'none',
            overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 100%)'
        },
        { 
            name: 'lateral-der', 
            mask: tapizLateralDerMask, 
            box: { left: 35.55, top: 46.50, width: 60.65, height: 22.15 },
            bgTransform: 'none',
            overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)'
        },
    ];

    return (
        <div className="h-screen flex flex-col bg-white text-gray-900 font-sans selection:bg-[#01c38e] selection:text-white overflow-hidden">
            <Head title="Personaliza tu Silla" />
            <Header />

            <main className="flex-1 pt-20 flex flex-col md:flex-row h-full overflow-hidden">
                {/* LADO IZQUIERDO: Visualizador de Silla 3D/Imagen */}
                <div className="relative w-full md:w-1/2 h-[400px] md:h-full bg-white flex justify-center items-center overflow-visible">

                    <div className="relative w-full max-w-md aspect-square z-10 flex justify-center items-center">
                        
                        {/* Fondo Mancha "Vaca" (Blob) centrado perfectamente detrás de la silla */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] pb-[130%] bg-[#01c38e]/10 animate-blob pointer-events-none" style={{ zIndex: -1 }}></div>

                        {/* Capa 1: Fierro, con filtro de color aproximado */}
                        {/* Capa 1: Fierro con sistema avanzado de tinte Hexadecimal */}
                        <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
                            {/* Base con sombra y ajustes de luz */}
                            <img
                                src={fierroRossi}
                                alt="Fierro de la silla"
                                className="absolute inset-0 w-full h-full object-contain"
                                style={{ filter: tintFilter(fierroColor) }}
                                draggable={false}
                            />
                            {/* Capa de color exacto usando mask-image */}
                            {CONFIG_COLORES_FIERRO[fierroColor]?.colorImagenHex && CONFIG_COLORES_FIERRO[fierroColor].colorImagenHex !== 'transparent' && (
                                <div 
                                    className="absolute inset-0 w-full h-full"
                                    style={{
                                        backgroundColor: CONFIG_COLORES_FIERRO[fierroColor].colorImagenHex,
                                        WebkitMaskImage: `url(${fierroRossi})`,
                                        maskImage: `url(${fierroRossi})`,
                                        WebkitMaskSize: 'contain',
                                        maskSize: 'contain',
                                        WebkitMaskPosition: 'center',
                                        maskPosition: 'center',
                                        WebkitMaskRepeat: 'no-repeat',
                                        maskRepeat: 'no-repeat',
                                        mixBlendMode: CONFIG_COLORES_FIERRO[fierroColor].blendMode || 'color'
                                    }}
                                />
                            )}
                        </div>

                        {/* Contenedor principal del Asiento (Tapiz)
                            Aquí agrupamos las 3 piezas para poder mover y escalar TODO el cojín
                            junto, encajándolo perfectamente sobre la imagen del fierro. */}
                        {selectedTela?.imagen_url && (
                            <div 
                                className="absolute"
                                style={{
                                    // ---------------------------------------------------
                                    // ¡AQUÍ PUEDES MOVER Y ESCALAR TODO EL COJÍN JUNTO!
                                    // ---------------------------------------------------
                                    left: '24%',      // Mueve a los lados (ej: '5%', '-2%')
                                    top: '18%',       // Mueve arriba/abajo (ej: '10%', '-5%')
                                    width: '57%',   // Reduce para hacerlo más pequeño (ej: '85%')
                                    height: '57%',  // Reduce para hacerlo más pequeño (ej: '85%')
                                    // ---------------------------------------------------
                                }}
                            >
                                {tapizPieces.map((piece) => {
                                    // Tamaños fijos en píxeles configurables independientemente
                                    const sizeLaterales = 160; // Tamaño para lado derecho e izquierdo
                                    const sizeSuperior = 110;  // Tamaño independiente para la parte de arriba
                                    
                                    const currentSize = piece.name === 'superior' ? sizeSuperior : sizeLaterales;

                                    return (
                                        <div
                                            key={piece.name}
                                            className="absolute"
                                            style={{
                                                left: `${piece.box.left}%`,
                                                top: `${piece.box.top}%`,
                                                width: `${piece.box.width}%`,
                                                height: `${piece.box.height}%`,
                                                WebkitMaskImage: `url(${piece.mask})`,
                                                maskImage: `url(${piece.mask})`,
                                                WebkitMaskSize: '100% 100%',
                                                maskSize: '100% 100%',
                                                WebkitMaskRepeat: 'no-repeat',
                                                maskRepeat: 'no-repeat',
                                                overflow: 'hidden',
                                                // Escalamos cada pieza un 1.5% más grande para forzar que los bordes 
                                                // de las máscaras se toquen sutilmente
                                                transform: 'scale(1.015)',
                                                transformOrigin: 'center center',
                                                // Elevamos la parte superior para que su sombra caiga sobre los lados
                                                zIndex: piece.name === 'superior' ? 10 : 5,
                                                // Creamos la ilusión de costura rellenando las líneas blancas con sombra
                                                filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.6)) drop-shadow(0px 0px 1px rgba(0,0,0,0.9))'
                                            }}
                                        >
                                            {/* Capa interna para aplicar transformaciones de perspectiva (rotación/diagonal) 
                                                a la imagen sin rotar la máscara. La hacemos más grande para evitar huecos. */}
                                            <div 
                                                className="absolute"
                                                style={{
                                                    left: '-100%',
                                                    top: '-100%',
                                                    width: '300%',
                                                    height: '300%',
                                                    backgroundImage: `url(${selectedTela.imagen_url})`,
                                                    // Usamos el tamaño fijo en px en lugar de porcentajes
                                                    backgroundSize: `${currentSize}px auto`,
                                                    backgroundPosition: 'center',
                                                    backgroundRepeat: 'repeat',
                                                    transform: piece.bgTransform,
                                                    transformOrigin: 'center center',
                                                }}
                                            />
                                            {/* Capa de Sombra/Iluminación para profundidad 3D */}
                                            <div 
                                                className="absolute inset-0 pointer-events-none"
                                                style={{ background: piece.overlay, mixBlendMode: 'multiply' }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* LADO DERECHO: Panel Configurador */}
                <div className="w-full md:w-1/2 h-full p-8 sm:p-12 md:p-16 flex flex-col justify-start bg-white">
                    <h4 className="text-xs tracking-[0.2em] text-[#01c38e] uppercase mb-4 font-bold flex-shrink-0">Configurador</h4>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#132d46] mb-4 leading-tight flex-shrink-0">Personaliza tu silla.</h1>
                    <p className="text-gray-500 mb-8 text-base flex-shrink-0">Elige cada detalle y crea una pieza que hable de tu espacio.</p>

                    <div className="flex border-b border-gray-200 mb-8 gap-8 text-[11px] font-bold tracking-widest uppercase cursor-pointer select-none flex-shrink-0">
                        <div 
                            onClick={() => setCurrentStep(1)}
                            className={`pb-3 border-b-2 transition-colors ${currentStep === 1 ? 'border-[#132d46] text-[#132d46]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                        >
                            <span className={`${currentStep === 1 ? 'text-gray-400' : ''} mr-2`}>01</span> Fierro
                        </div>
                        <div 
                            onClick={() => setCurrentStep(2)}
                            className={`pb-3 border-b-2 transition-colors ${currentStep === 2 ? 'border-[#132d46] text-[#132d46]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
                        >
                            <span className={`${currentStep === 2 ? 'text-gray-400' : ''} mr-2`}>02</span> Tela
                        </div>
                    </div>

                    {/* CONTENEDOR DESLIZABLE PARA LOS PASOS */}
                    <div className="flex-1 overflow-y-auto min-h-0 hide-scrollbar pb-6">
                        {/* PASO 1: FIERRO */}
                        {currentStep === 1 && (
                            <div className="animate-fade-in w-full">
                                <div className="flex flex-wrap gap-4 sm:gap-6">
                                {fierroOptions.map((fierro) => (
                                    <button
                                        key={fierro.id}
                                        onClick={() => setFierroColor(fierro.id)}
                                        className={`group flex flex-col items-center gap-3 p-2 rounded-xl transition-all duration-300 w-24 sm:w-28`}
                                    >
                                        <span
                                            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 shadow-sm transition-transform duration-300 group-hover:scale-110 ${
                                                fierroColor === fierro.id ? 'border-[#01c38e] ring-4 ring-[#01c38e]/20' : 'border-gray-200'
                                            }`}
                                            style={{ backgroundColor: fierro.hex }}
                                        ></span>
                                        <span className={`text-[10px] sm:text-xs font-bold text-center leading-tight ${fierroColor === fierro.id ? 'text-[#01c38e]' : 'text-gray-500 group-hover:text-gray-900'}`}>{fierro.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                        {/* PASO 2: TELA */}
                        {currentStep === 2 && (
                            <div className="animate-fade-in w-full">
                            {telas.length === 0 ? (
                                <p className="text-gray-400 text-sm">No hay telas disponibles en la base de datos.</p>
                            ) : (
                                <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-6 pt-2 snap-x snap-mandatory scroll-smooth hide-scrollbar w-full">
                                    {telas.map((tela) => (
                                        <button
                                            key={tela.id}
                                            onClick={() => setSelectedTela(tela)}
                                            className={`group flex-shrink-0 snap-start flex flex-col items-center gap-3 p-2 rounded-xl transition-all duration-300 w-28 sm:w-36`}
                                        >
                                            <div
                                                className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-cover bg-center border-2 shadow-sm transition-transform duration-300 group-hover:scale-105 ${
                                                    selectedTela?.id === tela.id ? 'border-[#01c38e] ring-4 ring-[#01c38e]/20' : 'border-gray-200'
                                                }`}
                                                style={{ backgroundImage: `url(${tela.imagen_url})` }}
                                            ></div>
                                            <span className={`text-[10px] sm:text-xs font-bold text-center leading-tight ${selectedTela?.id === tela.id ? 'text-[#01c38e]' : 'text-gray-500 group-hover:text-gray-900'}`}>{tela.nombre}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                            </div>
                        )}
                    </div>

                    {/* FOOTER FIJO */}
                    <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center sm:items-start text-left gap-6 w-full flex-shrink-0 mt-4">
                        <div className="flex flex-col items-center sm:items-start w-full sm:w-auto text-center sm:text-left">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Tu Configuración</p>
                            <p className="text-[#132d46] text-sm font-medium">
                                Fierro: <span className="font-bold text-[#01c38e]">{fierroOptions.find(f => f.id === fierroColor)?.name}</span>
                                <span className="mx-2 text-gray-300">•</span>
                                Tela: <span className="font-bold text-[#01c38e]">{selectedTela?.nombre || 'Ninguna'}</span>
                            </p>
                        </div>

                        <div className="flex items-center gap-4 self-end sm:self-auto w-full sm:w-auto justify-between sm:justify-end">
                            {currentStep === 2 && (
                                <button 
                                    onClick={() => setCurrentStep(1)} 
                                    className="text-gray-400 hover:text-[#132d46] text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 py-3"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                                    Atrás
                                </button>
                            )}

                            {currentStep === 1 ? (
                                <button 
                                    onClick={() => setCurrentStep(2)} 
                                    className="bg-[#132d46] text-white rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg flex items-center gap-2 group"
                                >
                                    Siguiente
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </button>
                            ) : (
                                <button className="bg-[#01c38e] text-white rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#01a679] transition-colors shadow-lg flex items-center gap-2 group">
                                    Confirmar
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; opacity: 0; }

                /* Animación suave para la "mancha de vaca" orgánica (Blob) */
                @keyframes blob {
                    0% { border-radius: 30% 70% 20% 80% / 70% 30% 80% 20%; transform: scale(1) rotate(0deg); }
                    33% { border-radius: 70% 30% 80% 20% / 20% 80% 30% 70%; transform: scale(1.05) rotate(6deg); }
                    66% { border-radius: 20% 80% 40% 60% / 80% 20% 60% 40%; transform: scale(0.95) rotate(-6deg); }
                    100% { border-radius: 30% 70% 20% 80% / 70% 30% 80% 20%; transform: scale(1) rotate(0deg); }
                }
                .animate-blob { 
                    animation: blob 15s ease-in-out infinite alternate; 
                    border-radius: 30% 70% 20% 80% / 70% 30% 80% 20%;
                }
                
                /* Ocultar barra de desplazamiento para el carrusel horizontal */
                .hide-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none; /* Chrome, Safari and Opera */
                }
            `}</style>
        </div>
    );
}

// -----------------------------------------------------------------
// Tinte aproximado del fierro vía CSS filter. La imagen base ya
// viene renderizada en un tono claro, así que esto es un parche
// visual, no un cambio real de color de píxel por píxel. Si más
// adelante necesitas colores exactos, lo ideal es tener el PNG del
// fierro ya renderizado en cada color en vez de aplicar un filtro.
// -----------------------------------------------------------------
function tintFilter(colorId) {
    const config = CONFIG_COLORES_FIERRO[colorId];
    
    if (!config || !config.ajustesDeLuz || config.ajustesDeLuz === 'none') {
        return SOMBRA_BASE_FIERRO;
    }
    
    return `${config.ajustesDeLuz} ${SOMBRA_BASE_FIERRO}`;
}